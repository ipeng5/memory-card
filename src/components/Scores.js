import React from 'react';

export default function Scores(props) {
  return (
    <div>
      <div className="score">
        Best: {props.bestScore}&nbsp;&nbsp;|&nbsp;&nbsp;Score: {props.currentScore}
      </div>
    </div>
  );
}
