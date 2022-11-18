import { useEffect, useState } from 'react';
import Header from './components/Header';
import Cards from './components/Cards';
import Scores from './components/Scores';

function App() {
  const CARD_NUMBER = 12;
  const [pokemons, setPokemons] = useState([]);
  const [choices, setChoices] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const loadCards = async () => {
      setPokemons(shuffleCards(await fetchPokemons(CARD_NUMBER)));
    };
    loadCards();
  }, [CARD_NUMBER]);

  const fetchPokemons = async num => {
    const pokemonArr = [];
    for (let i = 1; i <= num; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      const res = await fetch(url);
      const data = await res.json();
      const name = data.name[0].toUpperCase() + data.name.slice(1);
      const img = data.sprites.other.dream_world.front_default;
      pokemonArr.push({ name, img });
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
      <Scores currentScore={currentScore} bestScore={bestScore} />
      <Cards pokemons={pokemons} handleChoice={handleChoice} />
    </>
  );
}

export default App;
