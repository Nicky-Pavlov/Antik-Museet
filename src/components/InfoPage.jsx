import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import infoBg from '../assets/info guy/Info background.jpg';
import info1 from '../assets/info guy/Info 1.png';
import info2 from '../assets/info guy/Info 2.png';
import info3 from '../assets/info guy/Info 3.png';
import info4 from '../assets/info guy/Info 4.png';
import info5 from '../assets/info guy/Info 5.png';
import info6 from '../assets/info guy/Info 6.png';
import info7 from '../assets/info guy/Info 7.png';

const slides = [info1, info2, info3, info4, info5, info6, info7];

function InfoPage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const [crossfading, setCrossfading] = useState(false);

  function handleClick() {
    if (crossfading) return;
    const isLast = index === slides.length - 1;
    if (isLast) { navigate('/'); return; }
    setNextIndex(index + 1);
    setCrossfading(true);
    setTimeout(() => {
      setIndex(index + 1);
      setNextIndex(null);
      setCrossfading(false);
    }, 400);
  }

  return (
    <div
      onClick={handleClick}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url(${infoBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        margin: 0,
        padding: 0,
        cursor: 'pointer',
      }}
    >
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); navigate('/'); }}
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

      {/* Current slide — always visible underneath */}
      <img
        src={slides[index]}
        alt={`Info slide ${index + 1}`}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'bottom',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      {/* Next slide — fades in on top */}
      {crossfading && nextIndex !== null && (
        <img
          src={slides[nextIndex]}
          alt={`Info slide ${nextIndex + 1}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom',
            pointerEvents: 'none',
            userSelect: 'none',
            opacity: crossfading ? 1 : 0,
            transition: 'opacity 400ms ease',
            animation: 'fadeIn 400ms ease forwards',
          }}
        />
      )}

      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
}

export default InfoPage;
