import React from 'react';
import './GameEnd.css';

export default function GameEnd(props) {
  return (
    <div className="overlay">
      <div className="game-end">
        <h1>Game Over</h1>
        <p>Score: {props.currentScore}</p>
        <p>Best: {props.bestScore}</p>
        <button onClick={props.resetGame}>Play again</button>
      </div>
    </div>
  );
}
