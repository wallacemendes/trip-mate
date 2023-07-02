import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import api from './services/api';
import AllRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';

function App() { 

  return (
    <div className="App">
      <BrowserRouter>
        <AllRoutes/>
      </BrowserRouter>     
    </div>
  );
}

export default App;
