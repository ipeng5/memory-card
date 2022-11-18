import React from 'react';

export default function Cards(props) {
  return (
    <div className="card-container">
      {props.pokemons.map(p => (
        <div className="card" key={p.name}>
          <img src={p.img} alt="pokemon" />
          <p>{p.name}</p>
        </div>
      ))}
    </div>
  );
}
