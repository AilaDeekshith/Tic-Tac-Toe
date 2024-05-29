import { useState } from "react";


export default function GameBoard({onSelectSquare,board}){

    // let gameBoard = initialGameBoard;

    // for(const turn of turns){
    //     const {square,player} = turn;
    //     const {row,col} = square;

    //     gameBoard[row][col] = player;
    // }

    // const [gameBoard,setGameBoard] = useState(initialGameBoard);

    // function handleButtonClick(rowIndex,colIndex){
    //     setGameBoard((preGameBoard) => {
    //         const updatedBoard = [...preGameBoard.map(innerArray => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = playerSymbol;
    //         return updatedBoard;
    //         // return gameBoard[rowIndex][colIndex] = playerSymbol;
    //     });
    //     actPlayer();
    // }

    return(
        <ol id="game-board">
            {board.map((row,rowIndex)=><li key={rowIndex}>
                <ol>
                {row.map((playerSymbol,colIndex)=><li key={colIndex}>
                    <button onClick={() => onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol!==null}>{playerSymbol}</button>
                </li>)}
                </ol>
            </li>)}
        </ol>
    )
}