import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import BuildView from './components/BuildView';
import TheDuel from './components/TheDuel';
import FightScene from './components/FightScene';
import FightConclusion from './components/FightConclusion';
import InfoPage from './components/InfoPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/build" element={<BuildView />} />
      <Route path="/the-duel" element={<TheDuel />} />
      <Route path="/fight-scene" element={<FightScene />} />
      <Route path="/fight-conclusion" element={<FightConclusion />} />
      <Route path="/info" element={<InfoPage />} />
    </Routes>
  );
}

export default App;
