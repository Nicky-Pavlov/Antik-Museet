import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import BuildView from './components/BuildView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/build" element={<BuildView />} />
    </Routes>
  );
}

export default App;
