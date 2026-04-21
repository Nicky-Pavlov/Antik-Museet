import { useNavigate } from 'react-router-dom';
import babyStatue from '../assets/baby statue.png';
import guy from '../assets/guy.png';
import '../App.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <div className="grid-container">
        <div className="box">
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
          <h2 className="box-title">The Duel</h2>
        </div>
      </div>
    </div>
  )
}

export default Home;
