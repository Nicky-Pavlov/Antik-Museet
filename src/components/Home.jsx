import { useNavigate } from 'react-router-dom';
import babyStatue from '../assets/baby statue.png';
import guy from '../assets/guy.png';
import girl2 from '../assets/fight assets/argument scene/hit girl 2.png';
import '../App.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <div className="grid-container">
        <div className="box" onClick={() => navigate('/info')} style={{ cursor: 'pointer' }}>
          <img src={guy} alt="Guy" className="box-image" />
          <h2 className="box-title">Info</h2>
        </div>
        <div className="box" onClick={() => navigate('/build')} style={{ cursor: 'pointer' }}>
          <img src={babyStatue} alt="Baby Statue" className="box-image" />
          <h2 className="box-title">Build a statue</h2>
        </div>
        <div className="box" onClick={() => navigate('/paint')} style={{ cursor: 'pointer' }}>
          <img src={babyStatue} alt="Baby Statue" className="box-image" />
          <h2 className="box-title">Paint a statue</h2>
        </div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box" onClick={() => navigate('/the-duel')} style={{ cursor: 'pointer' }}>
          <img src={girl2} alt="Girl 2" className="box-image" style={{ transform: 'translate(-50%, 63%) scaleX(-1) rotate(-15deg)' }} />
          <h2 className="box-title">The Duel</h2>
        </div>
      </div>
    </div>
  )
}

export default Home;
