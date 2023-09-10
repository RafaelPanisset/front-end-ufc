import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignupPage';
import MainPage from './components/MainPage';
import reportWebVitals from './reportWebVitals';

const sendToAnalytics = (metric) => {
  // Send the metric to your analytics endpoint
  const body = JSON.stringify(metric);
  const url = 'https://example.com/analytics';
  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: 'POST', keepalive: true });
  }
};

reportWebVitals(sendToAnalytics);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);




