'use client'
import React, { useState } from 'react';
import "./style.css"
import Card from '../Card';

interface OnSearchProps {
  query: string
  userId: string
}

export const SearchBar = ({ query, userId }: OnSearchProps) => {

  //resultado de la busqueda
  const [results, setResults] = useState([]);

  // busqueda del usuario
  const [search, setSearch] = useState('');


  const handleSearch = async (search: string) => {

    try {

      const formattedSearch = search.replace(/ /g, '+');

      const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${formattedSearch}&api_key=60352d0e1d07a5b5492aa1b0e399801c`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await res.json();
      const movies = data.results;

      setResults(movies);

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
            <Card title={movie.title} poster_path={movie.poster_path} release_date={movie.release_date} idUser={userId} key={movie.id} />
          ))}
        </div>
        )}
      </div>
      
    </div>
  );
};

export default SearchBar;