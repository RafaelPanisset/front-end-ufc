import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3010/';

function EventPage() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    id:'',
    nome: '',
    data: '',
    local: '',
  });
  const [editEvent, setEditEvent] = useState({  
    id:'',
    nome: '',
    data: '',
    local: '',
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Fetch the initial list of UFC events from the API
    axios.get(`${API_URL}eventos`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleCreateEvent = () => {
    // Generate a new random ID as a string
    const randomId = Number(Math.floor(Math.random() * 1000) + 1);
    console.log("SSSS", randomId);
    // Assign the new ID to newEvent.id
    newEvent.id = randomId;
    console.log(newEvent);
    // Send a POST request to create the event using the newEvent object in the request body
    axios.post(`${API_URL}eventos`, newEvent)
      .then((response) => {
        setEvents([...events, response.data]);
  
        // Reset the newEvent object
        setNewEvent({
          id: '',
          nome: '',
          data: '',
          local: '',
        });
      })
      .catch((error) => {
        console.error('Error creating event:', error);
      });
  };
  

  const handleEditEvent = () => {
    // Ensure editEvent has the correct event ID
    editEvent.id = selectedEvent.id;
  
    // Send a PUT request to update the event using the editEvent object in the request body
    axios.put(`${API_URL}eventos/${selectedEvent.id}`, editEvent)
      .then((response) => {
        const updatedEvents = events.map((event) => {
          if (event.id === selectedEvent.id) {
            return { ...event, ...response.data };
          }
          return event;
        });
        setEvents(updatedEvents);
        setEditEvent({
          id: '', // Reset the id to empty
          nome: '',
          data: '',
          local: '',
        });
        setSelectedEvent(null);
      })
      .catch((error) => {
        console.error('Error editing event:', error);
      });
  };
  const handleDeleteEvent = (eventId) => {
    // Delete an event and remove it from the list
    axios.delete(`${API_URL}eventos/${eventId}`)
      .then(() => {
        const updatedEvents = events.filter((event) => event.id !== eventId);
        setEvents(updatedEvents);
      })
      .catch((error) => {
        console.error('Error deleting event:', error);
      });
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">UFC Events</h1>

      {/* Create Event */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Event Name"
          className="border border-gray-400 rounded px-2 py-1"
          value={newEvent.nome}
          onChange={(e) => setNewEvent({ ...newEvent, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="Event Date"
          className="border border-gray-400 rounded px-2 py-1 ml-2"
          value={newEvent.data}
          onChange={(e) => setNewEvent({ ...newEvent, data: e.target.value })}
        />
        <input
          type="text"
          placeholder="Event Location"
          className="border border-gray-400 rounded px-2 py-1 ml-2"
          value={newEvent.local}
          onChange={(e) => setNewEvent({ ...newEvent, local: e.target.value })}
        />
        <button
          className="bg-blue-500 text-white px-2 py-1 ml-2 rounded"
          onClick={handleCreateEvent}
        >
          Create Event
        </button>
      </div>

      {/* Edit Event */}
      {selectedEvent && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Edit event name"
            className="border border-gray-400 rounded px-2 py-1"
            value={editEvent.nome}
            onChange={(e) => setEditEvent({ ...editEvent, nome: e.target.value })}
          />
          <input
            type="text"
            placeholder="Edit event date"
            className="border border-gray-400 rounded px-2 py-1 ml-2"
            value={editEvent.data}
            onChange={(e) => setEditEvent({ ...editEvent, data: e.target.value })}
          />
          <input
            type="text"
            placeholder="Edit event location"
            className="border border-gray-400 rounded px-2 py-1 ml-2"
            value={editEvent.local}
            onChange={(e) => setEditEvent({ ...editEvent, local: e.target.value })}
          />
          <button
            className="bg-green-500 text-white px-2 py-1 ml-2 rounded"
            onClick={handleEditEvent}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 ml-2 rounded"
            onClick={() => setSelectedEvent(null)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Event List */}
      <ul>
        {events.map((event) => (
          <li key={event.id} className="flex justify-between items-center border-b border-gray-300 py-2">
            <div>
              <span>{event.nome}</span>
              <br />
              <span>Date: {event.data}</span>
              <br />
              <span>Location: {event.local}</span>
            </div>
            <div>
              <button
                className="text-blue-500 hover:underline mr-2"
                onClick={() => setSelectedEvent(event)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDeleteEvent(event.id)}
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

export default EventPage;
