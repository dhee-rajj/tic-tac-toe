export default function GameOver({ winner, onRestart }) {
    return (
        <div id="game-over">
            <h2>
                Game Over 
            </h2>
            {winner && <p>{winner}, won the match</p>}
            {!winner && <p>Match Draw</p>}
            <p><button onClick={onRestart}>Rematch!</button></p>
        </div>
    );
}
