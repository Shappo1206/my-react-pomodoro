// src/App.jsx
import React from 'react';
import './styles/app.css'; 
import Header from './components/layout/Header.jsx'; 
import HomePage from './pages/HomePage.jsx';         

function App() {
  return (
    <>
      <Header />
      <HomePage />
    </>
  );
}

export default App;