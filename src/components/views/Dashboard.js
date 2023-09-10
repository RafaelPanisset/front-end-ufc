// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <ul className="flex space-x-4">
        <li>
          <Link to="/">Card</Link>
        </li>
        <li>
          <Link to="/fights">Luta</Link>
        </li>
        <li>
          <Link to="/fighters">Lutadores</Link>
        </li>
        <li>
          <Link to="/events">Eventos</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
