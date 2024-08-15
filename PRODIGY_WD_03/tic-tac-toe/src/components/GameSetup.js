import React, { useState } from 'react';

const GameSetup = ({ onStartGame }) => {
  const [gameMode, setGameMode] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const handleStart = () => {
    if (gameMode === 'twoPlayer' && player1 && player2) {
      onStartGame({ gameMode, difficulty, player1, player2 });
    } else if (gameMode === 'ai' && player1) {
      onStartGame({ gameMode, difficulty, player1, player2: 'AI' });
    }
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl mb-4">Choose Game Mode</h1>
      <div className="mb-4">
        <button
          className="mr-2 bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => setGameMode('twoPlayer')}
        >
          Two Player
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded"
          onClick={() => setGameMode('ai')}
        >
          Versus AI
        </button>
      </div>

      {gameMode && gameMode === 'ai' && (
        <div className="mb-4">
          <label className="mr-2">Difficulty:</label>
          <select
            className="border p-2 rounded"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      )}

      {gameMode && (
        <div className="mt-4">
          <div className="mb-4">
            <input
              className="border p-2 rounded"
              type="text"
              placeholder="Player 1 Name"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
            />
          </div>
          {gameMode === 'twoPlayer' && (
            <div className="mb-4">
              <input
                className="border p-2 rounded"
                type="text"
                placeholder="Player 2 Name"
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
              />
            </div>
          )}
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleStart}
            disabled={!player1 || (gameMode === 'twoPlayer' && !player2)}
          >
            Start Game
          </button>
        </div>
      )}
    </div>
  );
};

export default GameSetup;
