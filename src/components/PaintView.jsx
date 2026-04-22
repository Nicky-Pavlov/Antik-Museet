import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import roomBg from '../assets/MuseumBG.jpg';
import '../App.css';

const statueFiles = ['/statues/Athena.stl', '/statues/Aphrodite.stl', '/statues/Agrippina.stl'];

function PaintView() {
  const navigate = useNavigate();
  const mountRef = useRef(null);
  const [paintColor, setPaintColor] = useState('#ff0000');
  const [brushRadius, setBrushRadius] = useState(8);
  const paintColorRef = useRef(paintColor);
  const brushRadiusRef = useRef(brushRadius);
  const selectedStatueUrl = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * statueFiles.length);
    return statueFiles[randomIndex];
  }, []);

  useEffect(() => {
    paintColorRef.current = paintColor;
  }, [paintColor]);

  useEffect(() => {
    brushRadiusRef.current = brushRadius;
  }, [brushRadius]);

  useEffect(() => {
    if (!mountRef.current) return undefined;

    const container = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      2000
    );
    camera.position.set(0, 30, 80);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.domElement.style.border = '2px solid #333';
    renderer.domElement.style.borderRadius = '8px';
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let isPainting = false;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 100, 30);
    scene.add(directionalLight);

    const loader = new STLLoader();
    let mesh;

    const setPointer = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const paintAtPointer = () => {
      if (!mesh) return;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObject(mesh, false);
      if (!intersects.length) return;

      const hit = intersects[0];
      const geometry = mesh.geometry;
      const positionAttribute = geometry.getAttribute('position');
      const colorAttribute = geometry.getAttribute('color');
      if (!colorAttribute || !positionAttribute || hit.face === null) return;

      const color = new THREE.Color(paintColorRef.current);
      const localHitPoint = mesh.worldToLocal(hit.point.clone());
      const radius = brushRadiusRef.current;
      const radiusSq = radius * radius;

      for (let i = 0; i < positionAttribute.count; i += 1) {
        const dx = positionAttribute.getX(i) - localHitPoint.x;
        const dy = positionAttribute.getY(i) - localHitPoint.y;
        const dz = positionAttribute.getZ(i) - localHitPoint.z;
        const distanceSq = dx * dx + dy * dy + dz * dz;

        if (distanceSq <= radiusSq) {
          colorAttribute.setXYZ(i, color.r, color.g, color.b);
        }
      }

      colorAttribute.needsUpdate = true;
    };

    const onPointerDown = (event) => {
      if (event.button !== 0) return;
      setPointer(event);
      raycaster.setFromCamera(pointer, camera);

      if (mesh && raycaster.intersectObject(mesh, false).length) {
        isPainting = true;
        controls.enabled = false;
        paintAtPointer();
      }
    };

    const onPointerMove = (event) => {
      if (!isPainting) return;
      setPointer(event);
      paintAtPointer();
    };

    const stopPainting = () => {
      if (!isPainting) return;
      isPainting = false;
      controls.enabled = true;
    };

    loader.load(
      selectedStatueUrl,
      (geometry) => {
        geometry.computeVertexNormals();
        geometry.center();
        geometry = geometry.toNonIndexed();

        const vertexCount = geometry.attributes.position.count;
        const colors = new Float32Array(vertexCount * 3);
        const baseColor = new THREE.Color('#d3d3d3');

        for (let i = 0; i < vertexCount; i += 1) {
          colors[i * 3] = baseColor.r;
          colors[i * 3 + 1] = baseColor.g;
          colors[i * 3 + 2] = baseColor.b;
        }

        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.MeshStandardMaterial({
          vertexColors: true,
          metalness: 0.2,
          roughness: 0.6,
        });

        mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        scene.add(mesh);

        geometry.computeBoundingSphere();
        const radius = geometry.boundingSphere?.radius ?? 40;
        camera.position.set(0, radius * 1.2, radius * 2.4);
        controls.target.set(0, 0, 0);
        controls.update();
      },
      undefined,
      (error) => {
        console.error('Failed to load STL model:', error);
      }
    );

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', onResize);
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', stopPainting);
    renderer.domElement.addEventListener('pointerleave', stopPainting);

    let animationFrameId;
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      animationFrameId = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', stopPainting);
      renderer.domElement.removeEventListener('pointerleave', stopPainting);
      window.cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();

      if (mesh) {
        mesh.geometry.dispose();
        mesh.material.dispose();
        scene.remove(mesh);
      }

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [selectedStatueUrl]);

  return (
    <div
      className="app"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        minHeight: '100vh',
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        backgroundImage: `url(${roomBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        style={{
          width: '360px',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          color: 'black',
          zIndex: 100,
        }}
      >
        <h1 style={{ margin: '0 0 10px 0' }}>Paint a Statue</h1>
        <p style={{ margin: '0 0 20px 0' }}>
          Paint the statue with your favorite colors!
        </p>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            marginBottom: '12px',
            width: '100%',
            flexWrap: 'wrap',
          }}
        >
          <label htmlFor="paint-color">
            Color:
          </label>
          <input
            id="paint-color"
            type="color"
            value={paintColor}
            onChange={(event) => setPaintColor(event.target.value)}
            style={{
              cursor: 'pointer',
              width: '40px',
              height: '32px',
              border: 'none',
              borderRadius: '4px',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            marginBottom: '16px',
            width: '100%',
            flexWrap: 'wrap',
          }}
        >
          <label htmlFor="brush-radius">
            Brush radius:
          </label>
          <input
            id="brush-radius"
            type="range"
            min="2"
            max="20"
            step="1"
            value={brushRadius}
            onChange={(event) => setBrushRadius(Number(event.target.value))}
            style={{ cursor: 'pointer', flex: 1, minWidth: '80px' }}
          />
          <span>{brushRadius}</span>
        </div>

        <button
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#1f2937',
            color: '#f8fafc',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
          }}
        >
          Go Back
        </button>
      </div>

      <div
        ref={mountRef}
        style={{
          flex: 1,
          height: 'calc(100% - 60px)',
          position: 'relative',
          margin: '30px 20px',
        }}
      />
    </div>
  );
}

export default PaintView;

