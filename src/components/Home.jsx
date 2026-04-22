import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import babyStatue from '../assets/baby statue.png';
import customGuy from '../assets/custom guy.png';
import guy from '../assets/guy.png';
import girl2 from '../assets/fight assets/argument scene/hit girl 2.png';
import '../App.css';

function Home() {
  const navigate = useNavigate();
  const [expandedBox, setExpandedBox] = useState(null);
  const timeoutRef = useRef(null);

  const handleBoxClick = (index, path) => {
    if (index >= 4) {
      navigate(path);
      return;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setExpandedBox(index);
    timeoutRef.current = setTimeout(() => {
      navigate(path);
    }, 800); // 800ms matches the CSS transition duration
  };

  return (
    <div className="app">
      <div className={`grid-container ${expandedBox !== null ? 'expanded' : ''}`}>
        <div className={`box ${expandedBox === 0 ? 'expanded-box' : ''}`} onClick={() => handleBoxClick(0, '/info')} style={{ cursor: 'pointer' }}>
          <img src={guy} alt="Guy" className="box-image" />
          <h2 className="box-title">Info</h2>
        </div>
        <div className={`box ${expandedBox === 1 ? 'expanded-box' : ''}`} onClick={() => handleBoxClick(1, '/build')} style={{ cursor: 'pointer' }}>
          <img src={babyStatue} alt="Baby Statue" className="box-image" />
          <h2 className="box-title">Build a statue</h2>
        </div>
        <div className={`box ${expandedBox === 2 ? 'expanded-box' : ''}`} onClick={() => handleBoxClick(2, '/paint')} style={{ cursor: 'pointer' }}>
          <img src={customGuy} alt="Custom Guy" className="box-image" />
          <h2 className="box-title">Paint a statue</h2>
        </div>
        <div className={`box ${expandedBox === 3 ? 'expanded-box' : ''}`} onClick={() => handleBoxClick(3, '/fight-scene')} style={{ cursor: 'pointer' }}>
          <img src={girl2} alt="Girl 2" className="box-image" style={{ transform: 'translate(-50%, 63%) scaleX(-1) rotate(-15deg)' }} />
          <h2 className="box-title">Fight</h2>
        </div>
        <div className="box"></div>
        <div className={`box ${expandedBox === 5 ? 'expanded-box' : ''}`} onClick={() => handleBoxClick(5, '/the-duel')} style={{ cursor: 'pointer' }}>
          <img src={girl2} alt="Girl 2" className="box-image" style={{ transform: 'translate(-50%, 63%) scaleX(-1) rotate(-15deg)' }} />
          <h2 className="box-title">The Duel</h2>
        </div>
      </div>
    </div>
  )
}

export default Home;
