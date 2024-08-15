import React, { useState } from 'react';

const LandingPage = ({ onStartGame }) => {
  const [gameMode, setGameMode] = useState('');
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const handleGameModeSelection = (mode) => {
    setGameMode(mode);
  };

  const handleStartGame = () => {
    if (gameMode === 'twoPlayer' && player1 && player2) {
      onStartGame({ gameMode, player1, player2 });
    } else if ((gameMode === 'ai-easy' || gameMode === 'ai-hard') && player1) {
      onStartGame({ gameMode, player1, player2: 'AI' });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h1 className="text-5xl font-bold mb-8">Welcome to Tic Tac Toe</h1>
      {!gameMode ? (
        <div className="space-y-4">
          <button
            onClick={() => handleGameModeSelection('twoPlayer')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
            Play with a Friend
          </button>
          <button
            onClick={() => handleGameModeSelection('ai-easy')}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition"
          >
            Play AI (Easy)
          </button>
          <button
            onClick={() => handleGameModeSelection('ai-hard')}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            Play AI (Hard)
          </button>
        </div>
      ) : (
        <div className="mt-8">
          <input
            className="border p-2 rounded text-black mb-4"
            type="text"
            placeholder="Player 1 Name"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
          />
          {gameMode === 'twoPlayer' && (
            <input
              className="border p-2 rounded text-black mb-4"
              type="text"
              placeholder="Player 2 Name"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
            />
          )}
          <button
            onClick={handleStartGame}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition"
            disabled={!player1 || (gameMode === 'twoPlayer' && !player2)}
          >
            Start Game
          </button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
