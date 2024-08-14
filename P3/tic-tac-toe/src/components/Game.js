import React, { useState, useEffect } from 'react';
import Board from './Board';
import Confetti from 'react-confetti';
import Modal from 'react-modal';
import GameSetup from './GameSetup';

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const startGame = ({ gameMode, difficulty, player1, player2 }) => {
    setGameMode(gameMode);
    setDifficulty(difficulty);
    setPlayer1(player1);
    setPlayer2(player2);
    setGameStarted(true);
  };

  useEffect(() => {
    if (gameMode === 'ai' && !xIsNext && !winner && !isDraw) {
      const aiMove = difficulty === 'easy' ? makeAIMoveEasy(squares) : makeAIMoveHard(squares);
      if (aiMove !== null) {
        handleClick(aiMove);
      }
    }
  }, [xIsNext, squares, gameMode, winner, isDraw, difficulty]);

  const handleClick = (i) => {
    if (winner || squares[i] || isDraw) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const winningPlayer = calculateWinner(newSquares);
    if (winningPlayer) {
      setWinner(winningPlayer === 'X' ? player1 : player2);
      setModalIsOpen(true);
    } else if (!newSquares.includes(null)) {
      setIsDraw(true);
      setModalIsOpen(true);
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setIsDraw(false);
    setModalIsOpen(false);
  };

  const makeAIMoveEasy = (squares) => {
    const emptySquares = squares.map((square, index) => (square === null ? index : null)).filter(index => index !== null);
    if (emptySquares.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      return emptySquares[randomIndex];
    }
    return null;
  };

  const makeAIMoveHard = (squares) => {
    // Check if AI can block the player
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        const newSquares = squares.slice();
        newSquares[i] = 'O';
        if (calculateWinner(newSquares)) {
          return i; // AI places 'O' to win
        }
        newSquares[i] = 'X';
        if (calculateWinner(newSquares)) {
          return i; // AI blocks 'X' from winning
        }
      }
    }
    // If no block or win is found, pick a random move
    return makeAIMoveEasy(squares);
  };

  if (!gameStarted) {
    return <GameSetup onStartGame={startGame} />;
  }

  return (
    <div className="text-center">
      {winner && <Confetti />}
      <h1 className="text-2xl mt-4">
        {winner
          ? `Winner: ${winner}`
          : isDraw
          ? "It's a draw!"
          : `Next player: ${xIsNext ? player1 : player2}`}
      </h1>
      <Board squares={squares} onClick={handleClick} />
      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={resetGame}
      >
        Reset
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={resetGame}
        className="bg-white p-6 max-w-md mx-auto mt-20 rounded shadow-lg text-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold">
          {winner ? `Congratulations! ${winner} wins!` : "It's a draw!"}
        </h2>
        <button
          onClick={resetGame}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Play Again
        </button>
      </Modal>
    </div>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
