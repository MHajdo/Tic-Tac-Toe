import calculateWinner from './CalculateWinner';
import Square from './Square';

export default function Board({ squares, xIsNext, onPlay }) {

    function handleClick(i) {
      if (squares[i] || calculateWinner(squares)) {
        return;
      }
      const nextSquares = squares.slice();
      xIsNext ? nextSquares[i] = 'X' : nextSquares[i] = 'O';
  
      onPlay(nextSquares);
    }
  
    const winner = calculateWinner(squares)
    let status;
    winner ? status = 'Winner: ' + winner : status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    
    
    const createBoard = [...Array(3)].map((row, i) => {
        const boardSquare = [...Array(3)].map((square, j) => {
            return (
                <Square
                key={3 * i + j}
                value={squares[3*i+j]}
                onSquareClick={() => handleClick(3*i+j)} />
            );
        });
       
        return (
            <div className='board-row'>
                {boardSquare}
            </div>
        );
    }); 
    
    return (
      <>
        <div className="status">{status}</div>
        {createBoard}
      </>
    )
  }