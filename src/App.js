import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './components/MainPage';
import CardSection from './components/Card/CardPage';
import EventSection from './components/Event/EventPage';
import FighterPage from './components/Fighter/FighterPage';
import FightPage from './components/Fight/FightPage';
import NavBar from './components/NavBar';
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignupPage';

function App() {
  // Assume you have a state that tracks whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn && <NavBar />} 
      <Routes>
        <Route path="/" element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />} />
        <Route path="/cards" element={isLoggedIn ? <CardSection /> : <Navigate to="/login" />} />
        <Route path="/events" element={isLoggedIn ? <EventSection /> : <Navigate to="/login" />} />
        <Route path="/fighters" element={isLoggedIn ? <FighterPage /> : <Navigate to="/login" />} />
        <Route path="/fights" element={isLoggedIn ? <FightPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage  setIsLoggedIn={setIsLoggedIn}  />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
