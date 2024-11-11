import { useState } from "react";
import Player from "./Components/Player";
import { GameBoard } from "./Components/Gameboard";
import Log from "./Components/Log";
import { WINNING_COMBINATIONS } from "./winingcombinations";
import GameOver from "./GamOver";
import clik from "../src/assets/audio/fast-simple-chop-5-6270.mp3"

//initial GamBoard defult value
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const PLAYERS={
  X:"player 1",
  O:"player 2",
}

function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function derivedWinner(gameBoard, playersNames) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = playersNames[firstSquareSymbol];
    }
  }
  return winner;
}
//GameBoard componenet derived
function derivedGamboard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function App() {
  const [playersNames, setPlayerNames] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = derivedActivePlayer(gameTurns);
 

  const gameBoard = derivedGamboard(gameTurns)
  

  const winner = derivedWinner(gameBoard, playersNames);
  const isDraw = gameTurns.length === 9 && !winner;

  function handelActivrPlayer(rowIndex, colIndex) {
    new Audio(clik).play();
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
     
      
      return updatedTurns;
    });
  }
  function handelRematch() {
    setGameTurns([]);
  }
  function handelPlayerNamesChang(symbol, playerNewName) {
    setPlayerNames((prevNames) => {
      return {
        ...prevNames,
        [symbol]: playerNewName,
      };
    });
  }
 
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            onNameChange={handelPlayerNamesChang}
            name={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            onNameChange={handelPlayerNamesChang}
            name={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>

        {(winner || isDraw) && (
          <GameOver rematch={handelRematch} winnerPlayer={winner} />
        )}

        <GameBoard  onSelectSqr={handelActivrPlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
