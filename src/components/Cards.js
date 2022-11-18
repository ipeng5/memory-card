import React from 'react';

export default function Cards(props) {
  const handleClick = p => {
    props.handleChoice(p);
  };

  return (
    <div className="card-container">
      {props.pokemons.map(p => (
        <div className="card" key={p.name} onClick={() => handleClick(p)}>
          <img src={p.img} alt="pokemon" />
          <p>{p.name}</p>
        </div>
      ))}
    </div>
  );
}
