export default function GameBoard({ onSelectSquare, board }) {
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button
                                    onClick={() =>
                                        onSelectSquare(rowIndex, colIndex)
                                    }
                                    disabled={playerSymbol != null}
                                >
                                    {playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}

//  Intial GameBoard before managing logs
//  const [gameBoard, setGameBoard] = useState(initialGameBoard);

// function handleSelectSquare(rowIndex, colIndex) {
//     setGameBoard((prevGameBoard) => {
//         const updatedGameBoard = [
//             ...prevGameBoard.map((innerArray) => [...innerArray]),
//         ];
//         updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
//         return updatedGameBoard;
//     });
//     onSelectSquare();
// }
