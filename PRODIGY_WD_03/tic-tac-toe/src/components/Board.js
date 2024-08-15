import React from 'react';

const Board = ({ squares, onClick }) => {
  const getButtonColor = (value) => {
    if (value === 'X') return 'bg-red-500';
    if (value === 'O') return 'bg-green-500';
    return 'bg-blue-200';
  };

  return (
    <div className="grid grid-cols-3 gap-2 w-64 mx-auto mt-8">
      {squares.map((square, i) => (
        <button
          key={i}
          className={`w-20 h-20 text-3xl font-bold flex items-center justify-center ${getButtonColor(square)}`}
          onClick={() => onClick(i)}
        >
          {square}
        </button>
      ))}
    </div>
  );
};

export default Board;
