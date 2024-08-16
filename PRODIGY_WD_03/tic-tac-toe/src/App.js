import React, { useState } from 'react';
import LandingPage from './components/LandingPage'; 
import Game from './components/Game'; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState(null);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const startGame = ({ gameMode, player1, player2 }) => {
    setGameMode(gameMode);
    setPlayer1(player1);
    setPlayer2(player2);
    setIsGameStarted(true);
  };

  return (
    <Router basename="/PRODIGY_WD/PRODIGY_WD_03/tic-tac-toe">
      <Routes>
        {}
        <Route
          path="/"
          element={
            !isGameStarted ? (
              <LandingPage onStartGame={startGame} />
            ) : (
              <Game mode={gameMode} player1={player1} player2={player2} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
