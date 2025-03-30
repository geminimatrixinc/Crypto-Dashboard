import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/cryptoCards.css';

import CryptoDashboard from './components/CryptoDashboard';
import Navigation from './components/Navigation';
import Watchlist from './components/WatchList';
import Login from './components/login/Login';
import Register from './components/login/Register';

function App() {

  return (
    <>
        <Router>
              <Navigation />
              <Routes>
                <Route path="/" element={ <CryptoDashboard  /> } />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<div>Not Found!</div>} />
              </Routes>
        </Router>
    
    </>
  );
}
 
export default App;
