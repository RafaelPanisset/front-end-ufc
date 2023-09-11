import React from 'react';
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
  // Check if a token exists in localStorage
  const hasToken = !!localStorage.getItem("token");

  return (
    <div>
      {hasToken && <NavBar />} 
      <Routes>
        <Route path="/" element={hasToken ? <MainPage /> : <Navigate to="/login" />} />
        <Route path="/cards" element={hasToken ? <CardSection /> : <Navigate to="/login" />} />
        <Route path="/events" element={hasToken ? <EventSection /> : <Navigate to="/login" />} />
        <Route path="/fighters" element={hasToken ? <FighterPage /> : <Navigate to="/login" />} />
        <Route path="/fights" element={hasToken ? <FightPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!hasToken ? <LoginPage /> : <Navigate to="/cards" />} />
        <Route path="/signup" element={!hasToken ? <SignupPage /> : <Navigate to="/cards" />} />
      </Routes>
    </div>
  );
}

export default App;
