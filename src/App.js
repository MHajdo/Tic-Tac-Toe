import { useState } from 'react';
import Board from './Board';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [ascending, setAscending] = useState(true);
  const sortMovesBy = ascending ? "Ascending" : "Descending";
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    move === currentMove && move === 0 ? description = "You are at game start" 
    : move === currentMove ? description = "You are at move #" + move 
    : move > 0 ? description = "Go to move #" + move 
    : description = "Go to game start";
    return (
      currentMove === move ? 
        <li key={move}>
          <p>{description}</p> 
        </li> 
      : <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
    )
  })

  function handleToggle() {  
    setAscending(!ascending);
  }

  return (
    <div className='tic-tac-toe'>
      <h1>Tic-tac-toe</h1>
      <div className='game'>
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          {ascending ? <ol>{moves}</ol> : <ol>{moves.slice().reverse()}</ol>}
        </div>
      </div>
      <div className='game-toggle'>
        <button onClick={handleToggle}>{sortMovesBy}</button>
      </div>
    </div>
  );
}
