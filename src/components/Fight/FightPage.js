import React, { useState, useEffect } from 'react';
import axios from 'axios';


const API_URL = 'https://ufc-crud.onrender.com/';
//const API_URL = 'http://localhost:3029/';

function FightPage() {
  const [fights, setFights] = useState([]);
  const [newFight, setNewFight] = useState({
    id: 0,
    idLutador1: 0,
    idLutador2: 0,
    idEvento: 0,
    idCard: 0,
  });
  const [editFight, setEditFight] = useState({
    id: 0,
    idLutador1: 0,
    idLutador2: 0,
    idEvento: 0,
    idCard: 0,
  });
  const [selectedFight, setSelectedFight] = useState(null);

  // Lists to store available events, cards, and fighters for dropdowns
  const [eventsList, setEventsList] = useState([]);
  const [cardsList, setCardsList] = useState([]);
  const [fightersList, setFightersList] = useState([]);

  useEffect(() => {
    // Fetch the initial list of fights from the API
    axios.get(`${API_URL}lutas`)
      .then((response) => {
        setFights(response.data);
      })
      .catch((error) => {
        console.error('Error fetching fights:', error);
      });

    // Fetch the list of events for the dropdown
    axios.get(`${API_URL}eventos`)
      .then((response) => {
        setEventsList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });

    // Fetch the list of cards for the dropdown
    axios.get(`${API_URL}cards`)
      .then((response) => {
        setCardsList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cards:', error);
      });

    // Fetch the list of fighters for the dropdown
    axios.get(`${API_URL}lutadores`)
      .then((response) => {
        setFightersList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching fighters:', error);
      });
  }, []);

  const handleCreateFight = () => {
    // Send a POST request to create the fight using the newFight object in the request body
    axios.post(`${API_URL}lutas`, newFight)
      .then((response) => {
        setFights([...fights, response.data]);

        // Reset the newFight object
        setNewFight({
          id: 0,
          idLutador1: 0,
          idLutador2: 0,
          idEvento: 0,
          idCard: 0,
        });
      })
      .catch((error) => {
        console.error('Error creating fight:', error);
      });
  };

  const handleEditFight = () => {
    // Ensure editFight has the correct fight ID
    editFight.id = selectedFight.id;

    // Send a PUT request to update the fight using the editFight object in the request body
    axios.put(`${API_URL}lutas/${selectedFight.id}`, editFight)
      .then((response) => {
        const updatedFights = fights.map((fight) => {
          if (fight.id === selectedFight.id) {
            return { ...fight, ...response.data };
          }
          return fight;
        });
        setFights(updatedFights);
        setEditFight({
          id: 0, // Reset the id to 0
          idLutador1: 0,
          idLutador2: 0,
          idEvento: 0,
          idCard: 0,
        });
        setSelectedFight(null);
      })
      .catch((error) => {
        console.error('Error editing fight:', error);
      });
  };

  const handleDeleteFight = (fightId) => {
    // Delete a fight and remove it from the list
    axios.delete(`${API_URL}lutas/${fightId}`)
      .then(() => {
        const updatedFights = fights.filter((fight) => fight.id !== fightId);
        setFights(updatedFights);
      })
      .catch((error) => {
        console.error('Error deleting fight:', error);
      });
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">UFC Fights</h1>

      {/* Create Fight */}
      <div className="mb-4">
        <select
          className="border border-gray-400 rounded px-2 py-1"
          value={newFight.idEvento}
          onChange={(e) => setNewFight({ ...newFight, idEvento: e.target.value })}
        >
          <option value="">Select Event</option>
          {eventsList.map((event) => (
            <option key={event.id} value={event.id}>
              {event.nome}
            </option>
          ))}
        </select>
        <select
          className="border border-gray-400 rounded px-2 py-1 ml-2"
          value={newFight.idCard}
          onChange={(e) => setNewFight({ ...newFight, idCard: e.target.value })}
        >
          <option value="">Select Card</option>
          {cardsList.map((card) => (
            <option key={card.id} value={card.id}>
              {card.nome}
            </option>
          ))}
        </select>
        <select
          className="border border-gray-400 rounded px-2 py-1 ml-2"
          value={newFight.idLutador1}
          onChange={(e) => setNewFight({ ...newFight, idLutador1: e.target.value })}
        >
          <option value="">Select Fighter 1</option>
          {fightersList.map((fighter) => (
            <option key={fighter.id} value={fighter.id}>
              {fighter.nome}
            </option>
          ))}
        </select>
        <select
          className="border border-gray-400 rounded px-2 py-1 ml-2"
          value={newFight.idLutador2}
          onChange={(e) => setNewFight({ ...newFight, idLutador2: e.target.value })}
        >
          <option value="">Select Fighter 2</option>
          {fightersList.map((fighter) => (
            <option key={fighter.id} value={fighter.id}>
              {fighter.nome}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-500 text-white px-2 py-1 ml-2 rounded"
          onClick={handleCreateFight}
        >
          Create Fight
        </button>
      </div>

      {/* Edit Fight */}
      {selectedFight && (
        <div className="mb-4">
          <select
            className="border border-gray-400 rounded px-2 py-1"
            value={editFight.idEvento}
            onChange={(e) => setEditFight({ ...editFight, idEvento: e.target.value })}
          >
            <option value="">Select Event</option>
            {eventsList.map((event) => (
              <option key={event.id} value={event.id}>
                {event.nome}
              </option>
            ))}
          </select>
          <select
            className="border border-gray-400 rounded px-2 py-1 ml-2"
            value={editFight.idCard}
            onChange={(e) => setEditFight({ ...editFight, idCard: e.target.value })}
          >
            <option value="">Select Card</option>
            {cardsList.map((card) => (
              <option key={card.id} value={card.id}>
                {card.nome}
              </option>
            ))}
          </select>
          <select
            className="border border-gray-400 rounded px-2 py-1 ml-2"
            value={editFight.idLutador1}
            onChange={(e) => setEditFight({ ...editFight, idLutador1: e.target.value })}
          >
            <option value="">Select Fighter 1</option>
            {fightersList.map((fighter) => (
              <option key={fighter.id} value={fighter.id}>
                {fighter.nome}
              </option>
            ))}
          </select>
          <select
            className="border border-gray-400 rounded px-2 py-1 ml-2"
            value={editFight.idLutador2}
            onChange={(e) => setEditFight({ ...editFight, idLutador2: e.target.value })}
          >
            <option value="">Select Fighter 2</option>
            {fightersList.map((fighter) => (
              <option key={fighter.id} value={fighter.id}>
                {fighter.nome}
              </option>
            ))}
          </select>
          <button
            className="bg-green-500 text-white px-2 py-1 ml-2 rounded"
            onClick={handleEditFight}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 ml-2 rounded"
            onClick={() => setSelectedFight(null)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Fight List */}
      <ul>
        {fights.map((fight) => (
          <li key={fight.id} className="flex justify-between items-center border-b border-gray-300 py-2">
            <div>
              <span>Fight ID: {fight.id}</span>
              <br />
              <span>Fighter 1: {fight.lutador1Nome}</span>
              <br />
              <span>Fighter 2: {fight.lutador2Nome}</span>
              <br />
              <span>Event: {fight.eventoNome}</span>
              <br />
              <span>Card: {fight.cardNome}</span>
            </div>
            <div>
              <button
                className="text-blue-500 hover:underline mr-2"
                onClick={() => setSelectedFight(fight)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDeleteFight(fight.id)}
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

export default FightPage;
