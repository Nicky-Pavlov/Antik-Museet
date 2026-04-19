import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

import babyBodyRight1 from '../assets/Baby Parts/baby body right 1.png';
import babyBodyTop1 from '../assets/Baby Parts/baby body top 1.png';
import babyHead1 from '../assets/Baby Parts/baby head 1.png';
import babyLeftSide from '../assets/Baby Parts/baby left side.png';
import duckHead from '../assets/Baby Parts/duck head.png';
import duckNeck1 from '../assets/Baby Parts/duck neck 1.png';
import roomBg from '../assets/BuildBG.png';

const initialPieces = [
  { id: 'baby-body-top', src: babyBodyTop1, target: { x: -249, y: -278 }, initial: { x: 286, y: -34 } },
  { id: 'baby-head', src: babyHead1, target: { x: -315, y: -515 }, initial: { x: -892, y: -178 } },
  { id: 'baby-left-side', src: babyLeftSide, target: { x: -231, y: -50 }, initial: { x: 550, y: -517 } },
  { id: 'baby-body-right', src: babyBodyRight1, target: { x: -48, y: -91 }, initial: { x: -632, y: -538 } },
  { id: 'duck-head', src: duckHead, target: { x: -50, y: -455 }, initial: { x: -553, y: -145 } },
  { id: 'duck-neck', src: duckNeck1, target: { x: 56, y: -147 }, initial: { x: 697, y: -83 } },
];

function PuzzlePiece({ piece }) {
  const [coords, setCoords] = useState(piece.initial);
  const [isSnapped, setIsSnapped] = useState(false);

  const x = useMotionValue(piece.initial.x);
  const y = useMotionValue(piece.initial.y);

  useMotionValueEvent(x, "change", (v) => setCoords(c => ({ ...c, x: Math.round(v) })));
  useMotionValueEvent(y, "change", (v) => setCoords(c => ({ ...c, y: Math.round(v) })));

  const handleDragEnd = () => {
    const distance = Math.hypot(x.get() - piece.target.x, y.get() - piece.target.y);
    if (distance < 60) {
      setIsSnapped(true);
    } else {
      setIsSnapped(false);
    }
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      animate={isSnapped ? { x: piece.target.x, y: piece.target.y } : undefined}
      style={{
        x,
        y,
        position: 'absolute',
        cursor: isSnapped ? 'default' : 'grab',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: isSnapped ? 1 : 10
      }}
      whileTap={{ cursor: "grabbing", zIndex: 20 }}
    >
      <img
        src={piece.src}
        alt={piece.id}
        style={{
          pointerEvents: 'none',
          filter: isSnapped ? 'none' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.6))',
          transition: 'filter 0.3s'
        }}
      />
    </motion.div>
  );
}

function BuildView() {
  const navigate = useNavigate();

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
        bottom: '65px',
        left: '30px',
        zIndex: 100,
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left'
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
        top: '55%',
        left: '50%',
        width: 0,
        height: 0,
        display: 'visible'
      }}>
        {initialPieces.map((piece) => (
          <PuzzlePiece key={piece.id} piece={piece} />
        ))}
      </div>
    </div>
  );
}

export default BuildView;
