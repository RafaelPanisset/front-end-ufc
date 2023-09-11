import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {

  const handleLogout = () => {
    // Set isLoggedIn to false when the "Logout" button is clicked
    localStorage.removeItem("token");
    window.location.replace('/login');
  };

  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
      <ul className="flex space-x-4">
        <li>
          <NavLink
            exact
            to="/cards"
            activeClassName="active"
          >
            Cards
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/events"
            activeClassName="active"
          >
            Events
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/fighters"
            activeClassName="active"
          >
            Fighters
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/fights"
            activeClassName="active"
          >
            Fights
          </NavLink>
        </li>
      </ul>
      <div className="space-x-4">
        <button
            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            onClick={handleLogout} // Call handleLogout on button click
          >
            Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
