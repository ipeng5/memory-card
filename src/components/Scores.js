import React from 'react';
import './Scores.css';

export default function Scores(props) {
  return (
    <>
      <div className="score">
        <p>Score: {props.currentScore}</p>
        <div>|</div>
        <p>Best: {props.bestScore}</p>
      </div>
    </>
  );
}
