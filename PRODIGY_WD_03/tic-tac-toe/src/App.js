import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import GameSetup from './components/GameSetup';
import Game from './components/Game';
import './App.css';

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const handleStartGame = ({ gameMode, difficulty, player1, player2 }) => {
    setGameMode(gameMode);
    setDifficulty(difficulty);
    setPlayer1(player1);
    setPlayer2(player2);
    setIsGameStarted(true);
  };

  return (
    <div className="App">
      {!isGameStarted ? (
        <LandingPage onStartGame={handleStartGame} />
      ) : (
        <Game mode={gameMode} player1={player1} player2={player2} />
      )}
    </div>
  );
}

export default App;
