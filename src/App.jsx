import Players from "./Components/Players"
import GameBoard from "./Components/GameBoard"
import { useState } from "react"
import Log from "./Components/Log";
import WinningCombinations from "./Components/WinningCombinations";
import GameOver from "./Components/GameOver";

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];

// const people = ['X','O']

// function RandomGen(){
//   return Math.floor(Math.random()*2);
// }


function deriveCurrentPlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length >0 && gameTurns[0].player == 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {


  const [players,setPlayers] = useState({
    'X':'Player 1',
    'O':'Player 2'
  }
  )

 // const [activePlayer,setActivePlayer] = useState('X');
  const [gameTurns,setGameTurns] = useState([])

  let activePlayer = deriveCurrentPlayer(gameTurns);



  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for(const turn of gameTurns){
      const {square,player} = turn;
      const {row,col} = square;

      gameBoard[row][col] = player;
  }

 let winner;

 for(const combination of WinningCombinations){
  const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col]
  const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col]
  const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col]

  if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
    winner = players[firstSquareSymbol];
  }
 }

 let hasDraw = (gameTurns.length == 9 && !winner);


  function handleReStart(){
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol,newName){
    setPlayers((preNames => {
      return(
        {
        ...preNames,
        [symbol]:newName
      })
    }))
  }



  function handleActivePlayer(rowIndex,colIndex){

    //setActivePlayer((currPlayer) => currPlayer==='X'?'O':'X');

    setGameTurns((prevTurns) => {

      let currentPlayer = deriveCurrentPlayer(prevTurns);

      // let currentPlayer = 'X';
      // if(prev.length>0 && prev[0].player=='X'){
      //   currentPlayer = 'O';
      // }

      const updatedTurns = [
        {
          square:{ row: rowIndex,col: colIndex},
          player: currentPlayer
        },
        ...prevTurns];

        return updatedTurns;

    })
  }

    return (
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Players initialName="player 1" symbol="X" isActive={activePlayer==='X'} onChangeName={handlePlayerNameChange}/>
            <Players initialName="player 2" symbol="O" isActive={activePlayer==='O'} onChangeName={handlePlayerNameChange}/>
          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleReStart}/>}
          <GameBoard onSelectSquare={handleActivePlayer} board={gameBoard}></GameBoard>
        </div>
        <Log turns={gameTurns}/>
      </main>
  )
}

export default App;
