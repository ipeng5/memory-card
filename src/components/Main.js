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
      {props.isLoading && <div className="loading">Loading...</div>}
      {props.error && <div className="loading">{props.error}</div>}
      {!props.isLoading && <Cards pokemons={props.pokemons} handleChoice={props.handleChoice} />}
    </main>
  );
}
