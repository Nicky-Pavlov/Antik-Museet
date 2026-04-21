import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

import babyBodyRight1 from '../assets/Baby Parts/baby body right 1.png';
import babyBodyTop1 from '../assets/Baby Parts/baby body top 1.png';
import babyHead1 from '../assets/Baby Parts/baby head 1.png';
import babyLeftSide from '../assets/Baby Parts/baby left side.png';
import duckHead from '../assets/Baby Parts/duck head.png';
import duckNeck1 from '../assets/Baby Parts/duck neck 1.png';
import babyStatueWhite from '../assets/baby statue-white.png';
import roomBg from '../assets/MuseumBG.jpg';

const BOARD_WIDTH = 1920;
const BOARD_HEIGHT = 1080;
const BOARD_ANCHOR_X = BOARD_WIDTH / 2;
const BOARD_ANCHOR_Y = BOARD_HEIGHT * 0.55;
const SNAP_DISTANCE = 60;

const toBoardSpace = (point) => ({
  x: BOARD_ANCHOR_X + point.x,
  y: BOARD_ANCHOR_Y + point.y,
});

const toNormalized = (point) => ({
  x: point.x / BOARD_WIDTH,
  y: point.y / BOARD_HEIGHT,
});

const pieceDefinitions = [
  { id: 'baby-body-top', src: babyBodyTop1, target: toNormalized({ x: 767, y: 418 }), spawn: toNormalized(toBoardSpace({ x: 286, y: -34 })), anchor: { x: 0, y: 0 } },
  { id: 'baby-head', src: babyHead1, target: toNormalized({ x: 699, y: 180 }), spawn: toNormalized(toBoardSpace({ x: -892, y: -178 })), anchor: { x: 0, y: 0 } },
  { id: 'baby-left-side', src: babyLeftSide, target: toNormalized({ x: 783, y: 646 }), spawn: toNormalized(toBoardSpace({ x: 550, y: -517 })), anchor: { x: 0, y: 0 } },
  { id: 'baby-body-right', src: babyBodyRight1, target: toNormalized({ x: 969, y: 604 }), spawn: toNormalized(toBoardSpace({ x: -632, y: -538 })), anchor: { x: 0, y: 0 } },
  { id: 'duck-head', src: duckHead, target: toNormalized({ x: 965, y: 241 }), spawn: toNormalized(toBoardSpace({ x: -553, y: -145 })), anchor: { x: 0, y: 0 } },
  { id: 'duck-neck', src: duckNeck1, target: toNormalized({ x: 1074, y: 549 }), spawn: toNormalized(toBoardSpace({ x: 697, y: -83 })), anchor: { x: 0, y: 0 } },
];

const buildInitialPieceState = () =>
  pieceDefinitions.reduce((acc, piece) => {
    acc[piece.id] = {
      position: { ...piece.spawn },
      isSnapped: false,
    };
    return acc;
  }, {});

function PuzzlePiece({ piece, pieceState, onPieceDragStart, onPieceDragEnd }) {
  const x = useMotionValue(pieceState.position.x * BOARD_WIDTH - piece.anchor.x);
  const y = useMotionValue(pieceState.position.y * BOARD_HEIGHT - piece.anchor.y);
  const isDraggingRef = useRef(false);
  const rafRef = useRef(null);
  const [currentBoardPos, setCurrentBoardPos] = useState({
    x: Math.round(pieceState.position.x * BOARD_WIDTH),
    y: Math.round(pieceState.position.y * BOARD_HEIGHT),
  });
  const targetBoardX = Math.round(piece.target.x * BOARD_WIDTH);
  const targetBoardY = Math.round(piece.target.y * BOARD_HEIGHT);

  useEffect(() => {
    if (isDraggingRef.current) {
      return;
    }

    x.set(pieceState.position.x * BOARD_WIDTH - piece.anchor.x);
    y.set(pieceState.position.y * BOARD_HEIGHT - piece.anchor.y);
    setCurrentBoardPos({
      x: Math.round(pieceState.position.x * BOARD_WIDTH),
      y: Math.round(pieceState.position.y * BOARD_HEIGHT),
    });
  }, [piece.anchor.x, piece.anchor.y, pieceState.position.x, pieceState.position.y, x, y]);

  useEffect(() => () => {
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
    }
  }, []);

  const updateGizmoFromMotion = () => {
    if (rafRef.current !== null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      const boardX = x.get() + piece.anchor.x;
      const boardY = y.get() + piece.anchor.y;
      setCurrentBoardPos({
        x: Math.round(boardX),
        y: Math.round(boardY),
      });
    });
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={() => {
        isDraggingRef.current = true;
        onPieceDragStart(piece.id);
      }}
      onDrag={updateGizmoFromMotion}
      onDragEnd={() => {
        isDraggingRef.current = false;
        onPieceDragEnd(piece.id, x.get(), y.get());
      }}
      style={{
        x,
        y,
        position: 'absolute',
        top: 0,
        left: 0,
        cursor: pieceState.isSnapped ? 'default' : 'grab',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: pieceState.isSnapped ? 1 : 10,
      }}
      whileTap={{ cursor: 'grabbing', zIndex: 20 }}
    >
      <img
        src={piece.src}
        alt={piece.id}
        style={{
          pointerEvents: 'none',
          filter: pieceState.isSnapped ? 'none' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.6))',
          transition: 'filter 0.3s',
          userSelect: 'none',
        }}
      />
      <div
        style={{
          marginTop: '8px',
          padding: '4px 6px',
          borderRadius: '6px',
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
          color: '#f8fafc',
          fontFamily: 'monospace',
          fontSize: '10px',
          lineHeight: 1.3,
          pointerEvents: 'none',
          whiteSpace: 'pre-line',
          textAlign: 'left',
        }}
      >
        {`cur: (${currentBoardPos.x}, ${currentBoardPos.y})`}
        <br />
        {`tgt: (${targetBoardX}, ${targetBoardY})`}
      </div>
    </motion.div>
  );
}

function BuildView() {
  const navigate = useNavigate();
  const [viewport, setViewport] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [pieceStateById, setPieceStateById] = useState(() => buildInitialPieceState());

  const boardRect = useMemo(() => {
    const isMobile = viewport.width < 900;
    const sidePanelWidth = isMobile ? 0 : 360;
    const horizontalPadding = isMobile ? 30 : 40;
    const topPadding = isMobile ? 150 : 40;
    const bottomPadding = 40;

    const availableWidth = Math.max(320, viewport.width - sidePanelWidth - horizontalPadding * 2);
    const availableHeight = Math.max(320, viewport.height - topPadding - bottomPadding);
    const scale = Math.min(availableWidth / BOARD_WIDTH, availableHeight / BOARD_HEIGHT);
    const width = BOARD_WIDTH * scale;
    const height = BOARD_HEIGHT * scale;
    const x = sidePanelWidth + (availableWidth - width) / 2 + horizontalPadding;
    const y = topPadding + (availableHeight - height) / 2;

    return { x, y, width, height, scale };
  }, [viewport.height, viewport.width]);

  const clampNormalized = (value) => Math.max(0, Math.min(1, value));

  const updatePositionFromBoard = (piece, localX, localY, preserveSnap = false) => {
    const nextX = localX + piece.anchor.x;
    const nextY = localY + piece.anchor.y;
    const normalizedX = clampNormalized(nextX / BOARD_WIDTH);
    const normalizedY = clampNormalized(nextY / BOARD_HEIGHT);

    setPieceStateById((prev) => ({
      ...prev,
      [piece.id]: {
        position: { x: normalizedX, y: normalizedY },
        isSnapped: preserveSnap ? prev[piece.id].isSnapped : false,
      },
    }));
  };

  const handlePieceDragStart = (id) => {
    if (!pieceStateById[id]?.isSnapped) return;
    setPieceStateById((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isSnapped: false,
      },
    }));
  };

  const handlePieceDragEnd = (id, localX, localY) => {
    const piece = pieceDefinitions.find((item) => item.id === id);
    if (!piece) return;

    const boardX = localX + piece.anchor.x;
    const boardY = localY + piece.anchor.y;
    const targetBoardX = piece.target.x * BOARD_WIDTH;
    const targetBoardY = piece.target.y * BOARD_HEIGHT;
    const distance = Math.hypot(boardX - targetBoardX, boardY - targetBoardY);

    if (distance <= SNAP_DISTANCE) {
      setPieceStateById((prev) => ({
        ...prev,
        [id]: {
          position: { ...piece.target },
          isSnapped: true,
        },
      }));
      return;
    }

    updatePositionFromBoard(piece, localX, localY);
  };

  useEffect(() => {
    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="app" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      color: '#fff',
      paddingTop: '30px',
      overflow: 'hidden',
      position: 'relative',
      backgroundImage: `url(${roomBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div style={{
        position: 'absolute',
        bottom: viewport.width < 900 ? '20px' : '65px',
        left: viewport.width < 900 ? '20px' : '30px',
        zIndex: 100,
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left',
        maxWidth: viewport.width < 900 ? '70vw' : '320px',
      }}>
        <h1 style={{ margin: '0 0 10px 0' }}>Build the Statue</h1>
        <p style={{ margin: '0 0 20px 0' }}>
          Drag the parts to assemble the masterpiece!
        </p>
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

      <div style={{
        position: 'absolute',
        left: `${boardRect.x}px`,
        top: `${boardRect.y}px`,
        width: `${boardRect.width}px`,
        height: `${boardRect.height}px`,
        borderRadius: '8px',
        overflow: 'hidden',
        border: '2px solid rgba(15, 23, 42, 0.6)',
        boxShadow: '0 10px 28px rgba(0, 0, 0, 0.28)',
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
      }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${BOARD_WIDTH}px`,
            height: `${BOARD_HEIGHT}px`,
            transform: `scale(${boardRect.scale})`,
            transformOrigin: 'top left',
          }}
        >
        <img
          src={babyStatueWhite}
          alt="Statue silhouette guide"
          style={{
            position: 'absolute',
            left: `${BOARD_ANCHOR_X}px`,
            top: `${BOARD_ANCHOR_Y}px`,
            transform: 'translate(-50%, -50%)',
            transformOrigin: 'center',
            opacity: 0.45,
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
          }}
        />
        {pieceDefinitions.map((piece) => (
          <PuzzlePiece
            key={piece.id}
            piece={piece}
            pieceState={pieceStateById[piece.id]}
            onPieceDragStart={handlePieceDragStart}
            onPieceDragEnd={handlePieceDragEnd}
          />
        ))}
        </div>
      </div>
    </div>
  );
}

export default BuildView;
