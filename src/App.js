import React from 'react';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  const [cardNumber, setCardNumber] = useState(8);
  const [pokemons, setPokemons] = useState([]);
  const [choices, setChoices] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCards = async () => {
      setIsLoading(true);
      setPokemons(shuffleCards(await fetchPokemons(cardNumber)));
      setIsLoading(false);
    };
    loadCards();
  }, [cardNumber]);

  const fetchPokemons = async num => {
    const pokemonArr = [];
    for (let i = 1; i <= num; i++) {
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Problem getting pokemon data');
        const data = await res.json();
        const name = data.name[0].toUpperCase() + data.name.slice(1);
        const img = data.sprites.other.dream_world.front_default;
        pokemonArr.push({ name, img });
      } catch (err) {
        console.error(err.message);
      }
    }
    return pokemonArr;
  };

  const shuffleCards = cards => {
    return [...cards].sort(() => Math.random() - 0.5);
  };

  const handleChoice = card => {
    if (choices.includes(card.name)) resetGame();
    else {
      setCurrentScore(prevScore => prevScore + 1);
    }
    choices.push(card.name);
    setPokemons(shuffleCards(pokemons));
  };

  const handleChangeMode = value => {
    setCardNumber(value);
  };

  useEffect(() => {
    if (currentScore > bestScore) setBestScore(currentScore);
  }, [currentScore, bestScore]);

  const resetGame = () => {
    setChoices([]);
    setCurrentScore(0);
  };

  return (
    <>
      <Header />
      <Main
        currentScore={currentScore}
        bestScore={bestScore}
        pokemons={pokemons}
        handleChoice={handleChoice}
        handleChangeMode={handleChangeMode}
        isLoading={isLoading}
      />
    </>
  );
}

export default App;
