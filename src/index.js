import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  function Square(props){
    return (
      <button 
        className="square" 
        onClick={props.onClick}
      >
        {props.value}
      </button>
    );
  }
  
  function Board(props){
    const colNum = [1, 2, 3];
    const rowNum = [1, 2, 3];
    return (
      <div>
        {rowNum.map((rowItem, rowIdx) => {
          return (<div className="board-row">
            {colNum.map((colItem, colIdx) => {
              const squareNo = (rowItem - 1) * colNum.length + colItem - 1;
              return (<Square 
                value={props.squares[squareNo]} 
                onClick={() => props.onClick(squareNo)}
              />)
            })}
          </div>)
        })}
      </div>
    );
  }

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

  function Game(props){
    const [history, setHistory] = useState([{squares : Array(9).fill(null),}]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    console.log(stepNumber)
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => {
            console.log("step :" + move)
            setStepNumber(move);
            setXIsNext((move % 2) === 0);
          }}>{desc}</button>
        </li>
      )
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => {
              const historyCurrent = history.slice(0, stepNumber + 1);
              const current = historyCurrent[historyCurrent.length - 1];
              const squares = current.squares.slice();
              if(calculateWinner(squares) || squares[i]){
                return;
              }
              squares[i] = xIsNext ? 'X' : 'O';
              setHistory(historyCurrent.concat([{squares : squares}]));
              setXIsNext(!xIsNext);
              setStepNumber(historyCurrent.length);
            }}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
 