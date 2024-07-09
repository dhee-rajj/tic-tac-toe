import GameBoard from "./Components/GameBoard";
import Player from "./Components/Player";
import Log from "./Components/Log";
import GameOver from "./Components/GameOver";

import { WINNING_COMBINATIONS } from "./winning-combinations";

import { useState } from "react";


const PLAYERS = { X: "Player 1", O: "Player 2" };
const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function deriveActivePlayer(gameTurns) {
    let currentPlayer = "X";

    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
        currentPlayer = "O";
    }

    return currentPlayer;
}

function dervieGameBoard(gameTurns) {
    let gameBoard = [
        ...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray]),
    ];

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
    }
    return gameBoard;
}

function deriveWinner(gameBoard, players) {
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
            winner = players[firstSquareSymbol];
        }
    }
    return winner;
}

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const [players, setPlayers] = useState({ X: "Player 1", O: "Player 2" });


    const activePlayer = deriveActivePlayer(gameTurns);
    const gameBoard = dervieGameBoard(gameTurns)
    const hasDraw = gameTurns.length === 9 && !winner;
    const winner = deriveWinner(gameBoard, players)

    function handleSelectSquare(rowIndex, colIndex) {
        setGameTurns((prevGameTurns) => {
            const currentPlayer = deriveActivePlayer(prevGameTurns);
            const updatedTurns = [
                {
                    square: { row: rowIndex, col: colIndex },
                    player: currentPlayer,
                },
                ...prevGameTurns,
            ];
            return updatedTurns;
        });
    }

    function handlePlayerNameChange(symbol, newName) {
        setPlayers((prevPlayers) => {
            return { ...prevPlayers, [symbol]: newName };
        });
    }

    function handleRestart() {
        setGameTurns([]);
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        initialName={PLAYERS.X}
                        symbol="X"
                        isActive={activePlayer === "X"}
                        onChangeName={handlePlayerNameChange}
                    ></Player>
                    <Player
                        initialName={PLAYERS.O}
                        symbol="O"
                        isActive={activePlayer === "O"}
                        onChangeName={handlePlayerNameChange}
                    ></Player>
                </ol>
                <GameBoard
                    onSelectSquare={handleSelectSquare}
                    board={gameBoard}
                />
            </div>
            {(hasDraw || winner) && (
                <GameOver winner={winner} onRestart={handleRestart}></GameOver>
            )}
            <Log turns={gameTurns}></Log>
        </main>
    );
}

export default App;
