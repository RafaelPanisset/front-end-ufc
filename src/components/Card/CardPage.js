import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://ufc-crud.onrender.com/';
//const API_URL = 'http://localhost:3029/';


function CardPage() {
  const [cards, setCards] = useState([]);
  const [newCardName, setNewCardName] = useState('');
  const [editCardName, setEditCardName] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    // Fetch the initial card list from the API
    axios.get(`${API_URL}cards`)
      .then((response) => {
        setCards(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cards:', error);
      });
  }, []);

  const handleCreateCard = () => {
    const randomId = Math.floor(Math.random() * 1000) + 1;
  
    // Create a new card with the random ID and provided cardName
    const newCard = { id: randomId, nome: newCardName };
  
    // Send a POST request to create the card using the newCard object in the request body
    axios.post(`${API_URL}cards`, newCard)
      .then((response) => {
        setCards([...cards, response.data]);
        setNewCardName('');
      })
      .catch((error) => {
        console.error('Error creating card:', error);
      });
  };
  
  const handleEditCard = () => {
    // Edit the selected card's name
    axios.put(`${API_URL}cards/${selectedCard.id}`, { nome: editCardName })
      .then((response) => {
        const updatedCards = cards.map((card) => {
          if (card.id === selectedCard.id) {
            return { ...card, nome: response.data.nome };
          }
          return card;
        });
        setCards(updatedCards);
        setEditCardName('');
        setSelectedCard(null);
      })
      .catch((error) => {
        console.error('Error editing card:', error);
      });
  };

  const handleDeleteCard = (cardId) => {
    // Delete a card and remove it from the list
    axios.delete(`${API_URL}cards/${cardId}`)
      .then(() => {
        const updatedCards = cards.filter((card) => card.id !== cardId);
        setCards(updatedCards);
      })
      .catch((error) => {
        console.error('Error deleting card:', error);
      });
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">UFC Cards</h1>

      {/* Create Card */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter card name"
          className="border border-gray-400 rounded px-2 py-1"
          value={newCardName}
          onChange={(e) => setNewCardName(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-2 py-1 ml-2 rounded"
          onClick={handleCreateCard}
        >
          Create Card
        </button>
      </div>

      {/* Edit Card */}
      {selectedCard && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Edit card name"
            className="border border-gray-400 rounded px-2 py-1"
            value={editCardName}
            onChange={(e) => setEditCardName(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-2 py-1 ml-2 rounded"
            onClick={handleEditCard}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 ml-2 rounded"
            onClick={() => setSelectedCard(null)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Card List */}
      <ul>
        {cards.map((card) => (
          <li key={card.id} className="flex justify-between items-center border-b border-gray-300 py-2">
            <span>{card.nome}</span>
            <div>
              <button
                className="text-blue-500 hover:underline mr-2"
                onClick={() => setSelectedCard(card)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDeleteCard(card.id)}
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

export default CardPage;
