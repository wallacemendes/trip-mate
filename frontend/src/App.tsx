import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import api from './services/api';
import AllRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/pt-br';

function App() { 

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
    <div className="App">
      <BrowserRouter>
        <AllRoutes/>
      </BrowserRouter>     
    </div>
    </LocalizationProvider>
  );
}

export default App;
