import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import GameEnd from './components/GameEnd';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  const [cardNumber, setCardNumber] = useState(6);
  const [pokemons, setPokemons] = useState([]);
  const [choices, setChoices] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);

  const random = () => {
    return Math.floor(Math.random() * 800) + 1;
  };

  const fetchPokemonData = useCallback(async cardNumber => {
    const pokemonArr = [];
    const start = random();
    const total = start + +cardNumber;
    for (let i = start; i < total; i++) {
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        setIsLoading(true);
        const res = await fetch(url);
        if (!res.ok) throw new Error('Problem getting pokemon data');
        const data = await res.json();
        setIsLoading(false);
        const name = data.name[0].toUpperCase() + data.name.slice(1);
        const img = data.sprites.other['official-artwork'].front_default;
        pokemonArr.push({ name, img });
      } catch (err) {
        console.error(err.message);
      }
    }
    return pokemonArr;
  }, []);

  useEffect(() => {
    const loadCards = async () => {
      setPokemons(await fetchPokemonData(cardNumber));
    };
    loadCards();
  }, [cardNumber, fetchPokemonData]);

  const shuffleCards = cards => {
    return [...cards].sort(() => Math.random() - 0.5);
  };

  const handleChoice = card => {
    if (choices.includes(card.name)) {
      setGameEnd(true);
    } else {
      setCurrentScore(prevScore => prevScore + 1);
    }
    choices.push(card.name);
    setPokemons(shuffleCards(pokemons));
  };

  const handleChangeMode = value => {
    resetGame();
    setCardNumber(value);
  };

  useEffect(() => {
    if (currentScore > bestScore) setBestScore(currentScore);
  }, [currentScore, bestScore]);

  const resetGame = () => {
    setPokemons(shuffleCards(pokemons));
    setGameEnd(false);
    setChoices([]);
    setCurrentScore(0);
  };

  useEffect(() => {
    if (gameEnd) document.body.classList.add('no-scroll');
    else document.body.classList.remove('no-scroll');
  }, [gameEnd]);

  return (
    <>
      <Header />
      {gameEnd && (
        <GameEnd currentScore={currentScore} bestScore={bestScore} resetGame={resetGame} />
      )}
      <Main
        currentScore={currentScore}
        bestScore={bestScore}
        pokemons={pokemons}
        handleChoice={handleChoice}
        handleChangeMode={handleChangeMode}
        isLoading={isLoading}
        gameEnd={gameEnd}
        resetGame={resetGame}
      />
    </>
  );
}

export default App;
