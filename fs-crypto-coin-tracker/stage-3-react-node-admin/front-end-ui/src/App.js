import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/cryptoCards.css';

import Landing from './components/Home/Landing';
import CryptoDashboard from './components/CryptoDashboard';
import Navigation from './components/Navigation';
import Watchlist from './components/WatchList';
import Login from './components/Login/LoginNew';
import Register from './components/Login/RegisterNew';

function App() {

  return (
    <>
        <Router>
              <Navigation />
              <Routes>
                <Route path="/" element={ <Landing  /> } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<CryptoDashboard />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="*" element={<div>Not Found!</div>} />
              </Routes>
        </Router>
    
    </>
  );
}
 
export default App;
