import { useEffect, useState } from 'react';
import Header from './components/Header';
import Cards from './components/Cards';
import Scores from './components/Scores';

function App() {
  const CARD_NUMBER = 12;
  const [pokemons, setPokemons] = useState([]);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const url = 'https://pokeapi.co/api/v2/pokemon/';

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

  return (
    <>
      <Header />
      <Scores />
      <Cards pokemons={pokemons} />
    </>
  );
}

export default App;
