import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import CardSection from './components/Card/CardPage';
import EventSection from './components/Event/EventPage';
import FighterPage from './components/Fighter/FighterPage';
import FightPage from './components/Fight/FightPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <div>
      <NavBar /> {/* Render the NavBar outside of Routes */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/cards" element={<CardSection />} />
        <Route path="/events" element={<EventSection />} />
        <Route path="/fighters" element={<FighterPage />} />
        <Route path="/fights" element={<FightPage />} />
      </Routes>
    </div>
  );
}

export default App;
