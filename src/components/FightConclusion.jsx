import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fightBg from '../assets/fight assets/fight scene/fight background.png';
import hitGirl1 from '../assets/fight assets/fight scene/hit girl 1.png';
import hitGirl2 from '../assets/fight assets/fight scene/hit girl 2.png';
import guyFinal from '../assets/fight assets/guy final.png';

function FightConclusion() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url(${fightBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Fade-in overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#000',
        opacity: visible ? 0 : 1,
        transition: 'opacity 900ms ease-in-out',
        pointerEvents: 'none',
        zIndex: 30,
      }} />

      {/* Back to Main */}
      <button
        type="button"
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: '2.5%',
          left: '2%',
          zIndex: 20,
          border: 'none',
          borderRadius: '999px',
          padding: '0.55rem 1rem',
          backgroundColor: 'rgba(0, 0, 0, 0.62)',
          color: '#f7e9d5',
          fontSize: '0.95rem',
          fontWeight: 700,
          letterSpacing: '0.02em',
          cursor: 'pointer',
        }}
      >
        Back to Main
      </button>

      {/* Girl 1 – fallen right; pivot at bottom-center so width stays in-frame */}
      <img
        src={hitGirl1}
        alt="Hit Girl 1"
        style={{
          position: 'absolute',
          bottom: '22%',
          left: '4%',
          height: '50%',
          width: 'auto',
          transform: 'rotate(85deg)',
          transformOrigin: 'bottom center',
          zIndex: 1,
        }}
      />

      {/* Girl 2 – fallen left */}
      <img
        src={hitGirl2}
        alt="Hit Girl 2"
        style={{
          position: 'absolute',
          bottom: '22%',
          left: '55%',
          height: '50%',
          width: 'auto',
          transform: 'rotate(-85deg)',
          transformOrigin: 'bottom center',
          zIndex: 1,
        }}
      />

      {/* Guy Final – right side */}
      <img
        src={guyFinal}
        alt="Guy Final"
        style={{
          position: 'absolute',
          bottom: '-4%',
          right: '0%',
          height: '96%',
          objectFit: 'contain',
          objectPosition: 'bottom',
          zIndex: 3,
        }}
      />
    </div>
  );
}

export default FightConclusion;
