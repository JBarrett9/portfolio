import { useEffect, useState } from "react";
import "./game-of-life.css";

const Life = () => {
  const [rows, setRows] = useState(Math.floor(window.innerHeight / 50));
  const [cols, setCols] = useState(Math.floor(window.innerWidth / 50));
  const [board, setBoard] = useState([]);
  const [activeCells, setActiveCells] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [running, setRunning] = useState(false);

  const initialiseBoard = () => {
    let newGrid = [];
    for (let row = 0; row < rows; row++) {
      newGrid.push(new Array(cols).fill("inactive"));
    }
    setBoard(newGrid);
  };

  useEffect(() => {
    if (refresh) {
      initialiseBoard();
      setRefresh(false);
    }
  }, [refresh]);

  const activate = (cell) => {
    let _copy = [...board];
    let _active = [...activeCells];
    const { row, col } = cell;
    _copy[row][col] = "active";
    _active.push({ row, col });
    setBoard(_copy);
    setActiveCells(_active);
  };

  const kill = (cell) => {
    let _copy = [...board];
    let _active = [...activeCells];
    const { row, col } = cell;
    _copy[row][col] = "inactive";
    for (let i = 0; i < _active.length; i++) {
      if (_active[i].row == row && _active[i].col == col) {
        _active.splice(i, 1);
      }
    }
    setBoard(_copy);
    setActiveCells(_active);
  };

  const handleClick = (e) => {
    const row = Number(e.target.dataset.row);
    const col = Number(e.target.dataset.col);

    if (board[row][col] === "active") {
      kill({ row, col });
    } else {
      activate({ row, col });
    }
  };

  const checkNeighbors = (cell) => {
    const { row, col } = cell;

    var count = 0;
    if (row - 1 >= 0) {
      if (board[row - 1][col] === "active") count++;
    }
    if (row - 1 >= 0 && col - 1 >= 0) {
      if (board[row - 1][col - 1] === "active") count++;
    }
    if (row - 1 >= 0 && col + 1 < cols) {
      if (board[row - 1][col + 1] === "active") count++;
    }
    if (col - 1 >= 0) {
      if (board[row][col - 1] === "active") count++;
    }
    if (col + 1 < cols) {
      if (board[row][col + 1] === "active") count++;
    }
    if (row + 1 < rows) {
      if (board[row + 1][col] === "active") count++;
    }
    if (row + 1 < rows && col - 1 >= 0) {
      if (board[row + 1][col - 1] === "active") count++;
    }
    if (row + 1 < rows && col + 1 < cols) {
      if (board[row + 1][col + 1] === "active") count++;
    }
    return count;
  };

  const play = () => {
    let cellsToKill = [];
    let cellsToActivate = [];
    let activeNeighbors = 0;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        activeNeighbors = checkNeighbors({ row, col });
        if (board[row][col] === "active") {
          if (activeNeighbors < 2 || activeNeighbors > 3) {
            cellsToKill.push({ row, col });
          }
        } else if (activeNeighbors === 3) {
          cellsToActivate.push({ row, col });
        }
      }
    }

    for (let cell of cellsToActivate) {
      activate(cell);
    }
    for (let cell of cellsToKill) {
      kill(cell);
    }
  };

  if (running) {
    setTimeout(play, 500);
  }

  return (
    <div className="game-of-life">
      <span className="buttons">
        <button onClick={() => setRunning(!running)}>
          {running ? "Pause" : "Start"}
        </button>
        <button onClick={() => setRefresh(true)}>Reset</button>
        <button onClick={() => play()}>Next</button>
      </span>
      <table className="board">
        <tbody>
          {board.map((row, rowIdx) => (
            <tr key={rowIdx} className="row">
              {row.map((cell, idx) => (
                <td
                  key={idx}
                  data-row={rowIdx}
                  data-col={idx}
                  className={`cell ${cell}`}
                  onClick={(e) => handleClick(e)}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Life;
