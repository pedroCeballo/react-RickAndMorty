// src/components/CharactersList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharactersList = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchCharacters();
  }, [currentPage, nameFilter, statusFilter]);

  const fetchCharacters = async () => {
     
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${nameFilter}&status=${statusFilter}`);
      setCharacters(response.data.results);
    
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNameChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  return (
    <div className="App">
      <img src="https://res.cloudinary.com/dkfzj9tmk/image/upload/v1677166689/backend-project/Rick-And-Morty-Logo-Transparent-File_arpmel.png" alt="logo" className='logo' />
      <form onSubmit={fetchCharacters}>
        <label>
          Name:
          <input type="text" value={nameFilter} onChange={handleNameChange} />
        </label>
        <label>
          Status:
          <select value={statusFilter} onChange={handleStatusChange}>
            <option value="">Any</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </label>
        <button type="submit">Buscar</button>
      </form>
      <div className="characters">
        {characters.map(character => (
          <div key={character.id} className="character">
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            <p>Especie: {character.species}</p>
            <p>Status: {character.status}</p>
            <p>Origen: {character.origin.name}</p>
            <p>Locacion: {character.location.name} </p>
          </div>
        ))}
      </div>
      <div>
        <button onClick={prevPage} disabled={currentPage === 1} className='btn'>Previous</button>
        <button onClick={nextPage} className='btn'>Next</button>
      </div>
    </div>
  );
};

export default CharactersList;
