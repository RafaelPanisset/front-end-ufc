import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
const API_URL = 'https://ufc-crud.onrender.com/'; // Import useHistory

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const [passwordsMatch, setPasswordsMatch] = useState(true); // State to track password matching

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      return; // Stop form submission if passwords don't match
    }

    // Reset the password matching state if they match
    setPasswordsMatch(true);

    // You can add your signup/registration logic here.
    // Typically, you would make an API request to your backend.
    // For simplicity, we'll just log the form data for now.
    console.log('Form Data:', formData);

    const randomId = Math.floor(Math.random() * 1000) + 1;

    // Create a new card with the random ID and provided cardName
    let info = {
      id: randomId,
      nomeUsuario: formData.username,
      nomeCompleto: formData.email,
      senha: formData.password,
    };

    // Send a POST request to create the card using the newCard object in the request body
    axios
      .post(`${API_URL}usuarios`, info)
      .then((response) => {
        console.log(response);

        // Redirect to the login page after successfully creating an account
        navigate('/login'); // Use navigate instead of history.push
      })
      .catch((error) => {
        console.error('Error creating card:', error);
      });
  };
  

  return (
    <div className="w-full max-w-md mx-auto mt-16">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Full Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            name="email"
            placeholder="Full name"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              !passwordsMatch ? 'border-red-500' : ''
            }`}
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              !passwordsMatch ? 'border-red-500' : ''
            }`}
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {!passwordsMatch && (
            <p className="text-red-500 text-xs italic">Passwords do not match.</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
