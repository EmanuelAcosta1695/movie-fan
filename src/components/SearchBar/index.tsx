import React, { useState } from 'react';

interface OnSearchProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: OnSearchProps) => {
  const [query, setQuery] = useState('');


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };


  const handleSearchClick = () => {
    onSearch(query);
  };


  return (
    <div>
      <input
        type="text"
        placeholder="Escribe tu búsqueda"
        value={query}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchClick}>Buscar</button>
    </div>
  );
};


export default SearchBar;
