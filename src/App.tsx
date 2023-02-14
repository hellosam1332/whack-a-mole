import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import GamePage from './pages/GamePage';

function App() {
  return (
    <Routes>
      <Route path="/:col?/:row?/:moles?" element={<Home />} />
      <Route path="/game/:col/:row/:moles" element={<GamePage />} />
    </Routes>
  );
}

export default App;
