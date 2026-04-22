import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fightBg from '../assets/fight assets/fight scene/fight background.png';
import hitGirl1 from '../assets/fight assets/fight scene/hit girl 1.png';
import hitGirl1Punch from '../assets/fight assets/fight scene/hit girl 1 hitting.png';
import hitGirl2 from '../assets/fight assets/fight scene/hit girl 2.png';
import hitGirl2Punch from '../assets/fight assets/fight scene/hit girl 2 hitting.png';

function FightScene() {
  const [isDarkOverlayVisible, setIsDarkOverlayVisible] = useState(true);
  const [isGirl1Punching, setIsGirl1Punching] = useState(false);
  const [isGirl2Punching, setIsGirl2Punching] = useState(false);
  const navigate = useNavigate();

  const triggerGirl1Punch = () => {
    setIsGirl1Punching(true);
    setTimeout(() => {
      setIsGirl1Punching(false);
    }, 520);
  };

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsDarkOverlayVisible(false);
    }, 30);

    return () => {
      clearTimeout(fadeTimer);
    };
  }, []);

  useEffect(() => {
    const girl2PunchInterval = setInterval(() => {
      setIsGirl2Punching(true);
      setTimeout(() => {
        setIsGirl2Punching(false);
      }, 580);
    }, 3000);

    return () => {
      clearInterval(girl2PunchInterval);
    };
  }, []);

  useEffect(() => {
    const fightEndTimer = setTimeout(() => {
      navigate('/fight-conclusion');
    }, 25000);

    return () => {
      clearTimeout(fightEndTimer);
    };
  }, [navigate]);

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
      <style>
        {`
          @keyframes idleGirl1 {
            0% { transform: translateX(0) translateY(0) scale(1); }
            18% { transform: translateX(0.7vw) translateY(-0.12vh) scale(1.008); }
            42% { transform: translateX(1.1vw) translateY(-0.05vh) scale(1.012); }
            72% { transform: translateX(0.85vw) translateY(-0.1vh) scale(1.008); }
            100% { transform: translateX(0) translateY(0) scale(1); }
          }

          @keyframes idleGirl2 {
            0% { transform: translateX(0) translateY(0) scale(1); }
            18% { transform: translateX(-0.7vw) translateY(-0.12vh) scale(1.008); }
            42% { transform: translateX(-1.1vw) translateY(-0.05vh) scale(1.012); }
            72% { transform: translateX(-0.85vw) translateY(-0.1vh) scale(1.008); }
            100% { transform: translateX(0) translateY(0) scale(1); }
          }
        `}
      </style>

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

      <img
        src={isGirl1Punching ? hitGirl1Punch : hitGirl1}
        alt="Hit Girl 1"
        onClick={triggerGirl1Punch}
        style={{
          position: 'absolute',
          bottom: '-6%',
          left: '2%',
          height: '96%',
          objectFit: 'contain',
          objectPosition: 'bottom',
          transform: isGirl1Punching ? 'translateX(clamp(468px, 61.2vw, 1368px))' : 'translateX(0)',
          transition: 'transform 340ms cubic-bezier(0.25, 0.1, 0.25, 1)',
          transformOrigin: '50% 100%',
          animation: isGirl1Punching ? 'none' : 'idleGirl1 980ms cubic-bezier(0.2, 0.8, 0.2, 1) infinite',
          cursor: 'pointer',
        }}
      />

      <img
        src={isGirl2Punching ? hitGirl2Punch : hitGirl2}
        alt="Hit Girl 2"
        style={{
          position: 'absolute',
          bottom: '-6%',
          right: '2%',
          height: '96%',
          objectFit: 'contain',
          objectPosition: 'bottom',
          transform: isGirl2Punching ? 'translateX(clamp(-1368px, -61.2vw, -468px))' : 'translateX(0)',
          transition: 'transform 340ms cubic-bezier(0.25, 0.1, 0.25, 1)',
          transformOrigin: '50% 100%',
          animation: isGirl2Punching ? 'none' : 'idleGirl2 1020ms cubic-bezier(0.2, 0.8, 0.2, 1) infinite',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#000',
          opacity: isDarkOverlayVisible ? 1 : 0,
          transition: 'opacity 850ms ease-in-out',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

export default FightScene;