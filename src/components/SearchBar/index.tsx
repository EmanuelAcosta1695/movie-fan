'use client'
import React, { useState } from 'react';
import "./style.css"
import Card from '../Card';

interface OnSearchProps {
  query: string
}

export const SearchBar = ({ query }: OnSearchProps) => {

  //resultado de la busqueda
  const [results, setResults] = useState([]);

  // busqueda del usuario
  const [search, setSearch] = useState('');


  const handleSearch = async (search: string) => {
    // console.log('Búsqueda:', query);
    // setResults(query);

    // console.log(result);
    // setResults(result);


    // --------------------------------------------------------------

    try {

      const formattedSearch = search.replace(/ /g, '+');

      console.log(formattedSearch)

      const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${formattedSearch}&api_key=60352d0e1d07a5b5492aa1b0e399801c`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await res.json(); // Espera a que la respuesta se convierta en JSON
      const movies = data.results;
  
      // console.log(movies);
      setResults(movies);
  
      //return { movies }; // Devuelve un objeto con la propiedad 'movies'

    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };


  return (
    <div className="ContainerSearchBar">
      <label className="SearchLabel">Ingresa tu pelicula:</label>
      <br />
      <input
        className='SearchInput'
        type="text"
        placeholder="Escribe tu búsqueda"
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />  
      <button className="SearchButton" onClick={() => handleSearch(search)}>
        Buscar
      </button>
      
      <div className="ResultsContainer">
        {results && results.length > 0 && (
        <div className='cardContainer'> 
          <button className="removeSearch" onClick={() => setResults([])}>X</button>
          <h3>Tu búsqueda:</h3>
          {results?.map((movie: any, index: number) => (
            <Card film={movie.title} photo={movie.poster_path} key={movie.id} />
          ))}
        </div>
        )}
      </div>
      
    </div>
  );
};

export default SearchBar;

// const SearchBar = ({ onSearch }: OnSearchProps) => {
//   const [query, setQuery] = useState('');


//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setQuery(e.target.value);
//   };


//   const handleSearchClick = () => {
//     onSearch(query);
//   };


//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Escribe tu búsqueda"
//         value={query}
//         onChange={handleInputChange}
//       />
//       <button onClick={handleSearchClick}>Buscar</button>
//     </div>
//   );
// };


// export default SearchBar;
