import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import BuildView from './components/BuildView';
import PaintView from './components/PaintView';
import TheDuel from './components/TheDuel';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/build" element={<BuildView />} />
      <Route path="/paint" element={<PaintView />} />
      <Route path="/the-duel" element={<TheDuel />} />
    </Routes>
  );
}

export default App;
