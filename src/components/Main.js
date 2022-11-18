import React from 'react';
import Cards from './Cards';
import Modes from './Modes';
import Scores from './Scores';
import './Main.css';

export default function Main(props) {
  return (
    <main>
      <div className="info">
        <Modes handleChangeMode={props.handleChangeMode} />
        <Scores currentScore={props.currentScore} bestScore={props.bestScore} />
      </div>
      <Cards pokemons={props.pokemons} handleChoice={props.handleChoice} />
    </main>
  );
}
