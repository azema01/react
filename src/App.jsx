import  { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
        const data = await response.json();
        const detailedPokemonPromises = data.results.map(pokemon =>
          fetch(pokemon.url).then(res => res.json())
        );
        const detailedPokemons = await Promise.all(detailedPokemonPromises);
        setPokemonData(detailedPokemons);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div className='blokc'>
      <div className='container'>
        <h2>GEEKS</h2>
        <div className='card-block'>
          {pokemonData.map((pokemon) => (
            <div className='bloc' key={pokemon.id}>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} className='image' />
              <h3>{pokemon.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
