import { useNavigate } from 'react-router-dom';
import fightConclusionBg from '../assets/fight assets/Fight concl.jpg';

function FightConclusion() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url(${fightConclusionBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        margin: 0,
        padding: 0,
      }}
    >
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
    </div>
  );
}

export default FightConclusion;
