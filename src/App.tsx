import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import GamePage from './pages/GamePage';
import ResultPage from './pages/ResultPage';
import RankingPage from './pages/RankingPage';

function App() {
  return (
    <Routes>
      <Route path="/:col?/:row?/:moles?" element={<Home />} />
      <Route path="/game/:col/:row/:moles" element={<GamePage />} />
      <Route path="/result/:col/:row/:moles" element={<ResultPage />} />
      <Route path="/ranking" element={<RankingPage />} />
    </Routes>
  );
}

export default App;
