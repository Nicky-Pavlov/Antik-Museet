import { useNavigate } from 'react-router-dom';
import handLeft from '../assets/screensaver/Image Hand Left.png';
import handRight from '../assets/screensaver/Image Hand Right.png';
import textLeft from '../assets/screensaver/Text Left.png';
import textRight from '../assets/screensaver/Text Right.png';
import sparkle from '../assets/screensaver/sparkle.png';

function AttractScreen() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate('/')}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#c4a882',
        cursor: 'pointer',
      }}
    >
      <style>{`
        @keyframes floatLeft {
          0%, 100% { transform: rotate(-6.5deg) translateX(0px); }
          50% { transform: rotate(-6.5deg) translateX(-18px); }
        }
        @keyframes floatRight {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(18px); }
        }
        @keyframes textPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
        @keyframes sparkleBurst {
          0%   { opacity: 0;   transform: translate(-50%, -50%) scale(0.3) rotate(0deg); }
          15%  { opacity: 1;   transform: translate(-50%, -50%) scale(1.3) rotate(25deg); }
          25%  { opacity: 0.5; transform: translate(-50%, -50%) scale(1.0) rotate(-10deg); }
          35%  { opacity: 1;   transform: translate(-50%, -50%) scale(1.2) rotate(20deg); }
          50%  { opacity: 0;   transform: translate(-50%, -50%) scale(0.4) rotate(40deg); }
          100% { opacity: 0;   transform: translate(-50%, -50%) scale(0.4) rotate(40deg); }
        }
      `}</style>

      {/* Sparkle – center, bursts every 5s */}
      <img
        src={sparkle}
        alt=""
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 'clamp(120px, 18vw, 300px)',
          pointerEvents: 'none',
          userSelect: 'none',
          mixBlendMode: 'screen',
          animation: 'sparkleBurst 2s ease-out infinite',
          animationDelay: '3s',
        }}
      />

      {/* Left hand */}
      <img
        src={handLeft}
        alt=""
        style={{
          position: 'absolute',
          left: '-5%',
          top: '-43%',
          height: '115%',
          objectFit: 'contain',
          objectPosition: 'top left',
          pointerEvents: 'none',
          userSelect: 'none',
          animation: 'floatLeft 3s ease-in-out infinite',
        }}
      />

      {/* Right hand */}
      <img
        src={handRight}
        alt=""
        style={{
          position: 'absolute',
          right: '-5%',
          bottom: '-43%',
          height: '115%',
          objectFit: 'contain',
          objectPosition: 'bottom right',
          pointerEvents: 'none',
          userSelect: 'none',
          animation: 'floatRight 3s ease-in-out infinite',
          transform: 'rotate(-35deg)',
          transformOrigin: 'top right',
        }}
      />

      {/* Left text */}
      <img
        src={textLeft}
        alt=""
        style={{
          position: 'absolute',
          left: '3%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(160px, 22vw, 380px)',
          objectFit: 'contain',
          pointerEvents: 'none',
          userSelect: 'none',
          animation: 'textPulse 2.4s ease-in-out infinite',
        }}
      />

      {/* Right text */}
      <img
        src={textRight}
        alt=""
        style={{
          position: 'absolute',
          right: '3%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(160px, 22vw, 380px)',
          objectFit: 'contain',
          pointerEvents: 'none',
          userSelect: 'none',
          animation: 'textPulse 2.4s ease-in-out infinite',
        }}
      />
    </div>
  );
}

export default AttractScreen;

