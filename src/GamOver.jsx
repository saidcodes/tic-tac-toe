import boo from "../src/assets/audio/boo-hahahaha-257718.mp3"
export default function GameOver({ winnerPlayer, rematch }) {
  new Audio(boo).play()
  return (
    <div id="game-over">
      
      <h2>Game Over</h2>
      {winnerPlayer &&  (
        <p style={{ color: "green", textTransform: "uppercase" }}>
          {winnerPlayer} <span style={{ color: "white" }}>won</span>{" "}
        </p>
      )}
      {!winnerPlayer && <p>its&apos; a draw</p>}
      <button onClick={rematch}>Rematch</button>
      
    </div>
  );
}
