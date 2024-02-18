import { getAllpokemon,getPokemon } from './utils/pokemon';
import { useEffect, useState } from 'react';
import './App.css';
import Card from './Components/Card/Card';
import NavBar from './Components/Navbar/NavBar';

function App() {
  
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const  [pokemonData, setPokemonData] = useState([]);
  const  [nextURL, setNextURL] = useState('');
  const  [prevURL, setprevtURL] = useState('');

  useEffect(() => {
    const fetchPokemonData  = async () => {
      //全てのデータを取得
      let res = await getAllpokemon(initialURL);
      //各ポケモンの詳細のデータを取得
      loadpokemon(res.results);
      
     //次のページのデータを取得
     setNextURL(res.next);

     //前のページのデータを取得
     setprevtURL(res.previous);

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



  //次のページと前のページを検索するボタンの関数を作成する
  const handlePrevPage =  async  () => {
    if(!prevURL) return;
    setLoading(true)
    let data = await getAllpokemon(prevURL);
    await loadpokemon(data.results);
    setNextURL(data.next);
    setprevtURL(data.previous);
    setLoading(false)
  };
  


  const handleNextPage =  async   () => {
   setLoading(true);
   let data = await getAllpokemon(nextURL);
   await loadpokemon(data.results);
   setNextURL(data.next);
   setprevtURL(data.previous);
   setLoading(false);
  };
  







  return (
    <>
    <NavBar/>
   <div className='App'>
   <div className='btn'>
     <button onClick={handlePrevPage}>前へ</button>
     <button onClick={handleNextPage}>次へ</button>
   </div>
     {loading ? (
       <h1>loading中です</h1>
     )
    : (
      <>
   <div className='pokemonCardContainer'>
     {pokemonData.map((pokemon ,index) => {
       return <Card  key={index}  pokemon={pokemon}/>;
     })}
   </div>
   </>
    )
    }
   </div>
   </>
  );
}

export default App;
