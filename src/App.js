import { getAllpokemon,getPokemon } from './utils/pokemon';
import { useEffect, useState } from 'react';
import './App.css';
import Card from './Components/Card/Card';

function App() {
  
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const  [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData  = async () => {
      //全てのデータを取得
      let res = await getAllpokemon(initialURL);
      //各ポケモンの詳細のデータを取得
      loadpokemon(res.results);
      setLoading(false);
    }
    fetchPokemonData();
  }, [])


  //各ポケモンのデータを取得するための関数
  const loadpokemon = async(data) => {
    let  _pokemonData =  await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return  pokemonRecord;
      })
    ) 
    setPokemonData(_pokemonData);
  }

  console.log(pokemonData)

  return (
   <div className='App'>
     {loading ? (
       <h1>loading中です</h1>
     )
    : (
   <div className='pokemonCardContainer'>
     {pokemonData.map((pokemon ,index) => {
       return <Card  key={index}  pokemon={pokemon}/>;
     })}
   </div>

    )
    }
   </div>
  );
}

export default App;
