import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3010/';

function FighterPage() {
  const [fighters, setFighters] = useState([]);
  const [newFighter, setNewFighter] = useState({
    id: '',
    nome: '',
    categoriaPeso: '',
    paisOrigem: '',
    idade: '',
    altura: '',
    alcance: '',
  });
  const [editFighter, setEditFighter] = useState({
    id: '',
    nome: '',
    categoriaPeso: '',
    paisOrigem: '',
    idade: '',
    altura: '',
    alcance: '',
  });
  const [selectedFighter, setSelectedFighter] = useState(null);

  useEffect(() => {
    // Fetch the initial list of fighters from the API
    axios.get(`${API_URL}lutadores`)
      .then((response) => {
        setFighters(response.data);
      })
      .catch((error) => {
        console.error('Error fetching fighters:', error);
      });
  }, []);

  const handleCreateFighter = () => {
    // Generate a new random ID as a string
    const randomId = Number(Math.floor(Math.random() * 1000) + 1);

    // Assign the new ID to newFighter.id
    newFighter.id = randomId;

    // Send a POST request to create the fighter using the newFighter object in the request body
    axios.post(`${API_URL}lutadores`, newFighter)
      .then((response) => {
        setFighters([...fighters, response.data]);

        // Reset the newFighter object
        setNewFighter({
          id: '',
          nome: '',
          categoriaPeso: '',
          paisOrigem: '',
          idade: '',
          altura: '',
          alcance: '',
        });
      })
      .catch((error) => {
        console.error('Error creating fighter:', error);
      });
  };

  const handleEditFighter = () => {
    // Ensure editFighter has the correct fighter ID
    editFighter.id = selectedFighter.id;

    // Send a PUT request to update the fighter using the editFighter object in the request body
    axios.put(`${API_URL}lutadores/${selectedFighter.id}`, editFighter)
      .then((response) => {
        const updatedFighters = fighters.map((fighter) => {
          if (fighter.id === selectedFighter.id) {
            return { ...fighter, ...response.data };
          }
          return fighter;
        });
        setFighters(updatedFighters);
        setEditFighter({
          id: '', // Reset the id to empty
          nome: '',
          categoriaPeso: '',
          paisOrigem: '',
          idade: '',
          altura: '',
          alcance: '',
        });
        setSelectedFighter(null);
      })
      .catch((error) => {
        console.error('Error editing fighter:', error);
      });
  };

  const handleDeleteFighter = (fighterId) => {
    // Delete a fighter and remove it from the list
    axios.delete(`${API_URL}lutadores/${fighterId}`)
      .then(() => {
        const updatedFighters = fighters.filter((fighter) => fighter.id !== fighterId);
        setFighters(updatedFighters);
      })
      .catch((error) => {
        console.error('Error deleting fighter:', error);
      });
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">UFC Fighters</h1>

      {/* Create Fighter */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Fighter Name"
          className="border border-gray-400 rounded px-2 py-1"
          value={newFighter.nome}
          onChange={(e) => setNewFighter({ ...newFighter, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="Weight Category"
          className="border border-gray-400 rounded px-2 py-1 ml-2"
          value={newFighter.categoriaPeso}
          onChange={(e) => setNewFighter({ ...newFighter, categoriaPeso: e.target.value })}
        />
        <input
          type="text"
          placeholder="Country of Origin"
          className="border border-gray-400 rounded px-2 py-1 ml-2"
          value={newFighter.paisOrigem}
          onChange={(e) => setNewFighter({ ...newFighter, paisOrigem: e.target.value })}
        />
        <input
          type="text"
          placeholder="Age"
          className="border border-gray-400 rounded px-2 py-1 ml-2"
          value={newFighter.idade}
          onChange={(e) => setNewFighter({ ...newFighter, idade: e.target.value })}
        />
        <input
          type="text"
          placeholder="Height"
          className="border border-gray-400 rounded px-2 py-1 ml-2"
          value={newFighter.altura}
          onChange={(e) => setNewFighter({ ...newFighter, altura: e.target.value })}
        />
        <input
          type="text"
          placeholder="Reach"
          className="border border-gray-400 rounded px-2 py-1 ml-2 my-px mt-4 ml-0"
          value={newFighter.alcance}
          onChange={(e) => setNewFighter({ ...newFighter, alcance: e.target.value })}
        />
        <button
          className="bg-blue-500 text-white px-2 py-1 ml-2 rounded"
          onClick={handleCreateFighter}
        >
          Create Fighter
        </button>
      </div>

      {/* Edit Fighter */}
      {selectedFighter && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Edit fighter name"
            className="border border-gray-400 rounded px-2 py-1"
            value={editFighter.nome}
            onChange={(e) => setEditFighter({ ...editFighter, nome: e.target.value })}
          />
          <input
            type="text"
            placeholder="Edit weight category"
            className="border border-gray-400 rounded px-2 py-1 ml-2"
            value={editFighter.categoriaPeso}
            onChange={(e) => setEditFighter({ ...editFighter, categoriaPeso: e.target.value })}
          />
          <input
            type="text"
            placeholder="Edit country of origin"
            className="border border-gray-400 rounded px-2 py-1 ml-2"
            value={editFighter.paisOrigem}
            onChange={(e) => setEditFighter({ ...editFighter, paisOrigem: e.target.value })}
          />
          <input
            type="text"
            placeholder="Edit age"
            className="border border-gray-400 rounded px-2 py-1 ml-2"
            value={editFighter.idade}
            onChange={(e) => setEditFighter({ ...editFighter, idade: e.target.value })}
          />
          <input
            type="text"
            placeholder="Edit height"
            className="border border-gray-400 rounded px-2 py-1 ml-2"
            value={editFighter.altura}
            onChange={(e) => setEditFighter({ ...editFighter, altura: e.target.value })}
          />
          <input
            type="text"
            placeholder="Edit reach"
            className="border border-gray-400 rounded px-2 py-1 ml-2"
            value={editFighter.alcance}
            onChange={(e) => setEditFighter({ ...editFighter, alcance: e.target.value })}
          />
          <button
            className="bg-green-500 text-white px-2 py-1 ml-2 rounded"
            onClick={handleEditFighter}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 ml-2 rounded"
            onClick={() => setSelectedFighter(null)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Fighter List */}
      <ul>
        {fighters.map((fighter) => (
          <li key={fighter.id} className="flex justify-between items-center border-b border-gray-300 py-2">
            <div>
              <span>Name: {fighter.nome}</span>
              <br />
              <span>Weight Category: {fighter.categoriaPeso}</span>
              <br />
              <span>Country of Origin: {fighter.paisOrigem}</span>
              <br />
              <span>Age: {fighter.idade}</span>
              <br />
              <span>Height: {fighter.altura}</span>
              <br />
              <span>Reach: {fighter.alcance}</span>
            </div>
            <div>
              <button
                className="text-blue-500 hover:underline mr-2"
                onClick={() => setSelectedFighter(fighter)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDeleteFighter(fighter.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FighterPage;
