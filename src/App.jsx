import { useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './components/Home';
import BuildView from './components/BuildView';
import PaintView from './components/PaintView';
import TheDuel from './components/TheDuel';
import FightScene from './components/FightScene';
import FightConclusion from './components/FightConclusion';
import InfoPage from './components/InfoPage';
import AttractScreen from './components/AttractScreen';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const idleTimer = useRef(null);

  // Go to attract screen on first load
  useEffect(() => {
    navigate('/attract', { replace: true });
  }, []); // eslint-disable-line

  // Reset 60s idle timer on any interaction; fire only when not already on attract
  useEffect(() => {
    const reset = () => {
      clearTimeout(idleTimer.current);
      if (location.pathname !== '/attract') {
        idleTimer.current = setTimeout(() => navigate('/attract'), 60000);
      }
    };
    const events = ['mousedown', 'mousemove', 'keydown', 'touchstart', 'scroll', 'click'];
    events.forEach(e => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => {
      clearTimeout(idleTimer.current);
      events.forEach(e => window.removeEventListener(e, reset));
    };
  }, [location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/attract" element={<AttractScreen />} />
      <Route path="/" element={<Home />} />
      <Route path="/build" element={<BuildView />} />
      <Route path="/paint" element={<PaintView />} />
      <Route path="/the-duel" element={<TheDuel />} />
      <Route path="/fight-scene" element={<FightScene />} />
      <Route path="/fight-conclusion" element={<FightConclusion />} />
      <Route path="/info" element={<InfoPage />} />
    </Routes>
  );
}

export default App;
