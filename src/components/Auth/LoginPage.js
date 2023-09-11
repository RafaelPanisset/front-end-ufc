import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://ufc-crud.onrender.com/'; // Import useHistory
//const API_URL = 'http://localhost:3034/'; // Import useHistory
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your authentication logic here.
    // Typically, you would make an API request to your backend.
    // For simplicity, we'll just log the form data for now.
    let info = {
      username: formData.email,
      password: formData.password
    }
    axios
    .post(`${API_URL}usuarios/logar`, info)
    .then((response) => {
      if (response) {
        localStorage.setItem("token", response.data); 
        window.location.replace('/cards');
        // Redirect to the login page after successfully creating an account
      }
      else {
        window.alert("Problema ao logar!");
      }
    })
    .catch((error) => {
      window.alert(error);
      console.error('Error creating card:', error);
    });
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-16">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            User name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            name="email"
            placeholder="User name"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <Link to="/signup" className="text-gray-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
