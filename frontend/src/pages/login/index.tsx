import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './styles.css'
import Header from '../../components/header/intex';
import Footer from '../../components/footer/intex';
import { Route, Router, redirect, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import {toast, Toaster} from 'react-hot-toast'

interface LoginProps {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [loginData, setLoginData] = useState<LoginProps>({
    email: '',
    password: '',
  });
  const navigate = useNavigate()


  //Alterar tratamendo do formulário para Formik
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Lógica para autenticação do usuário
    setLoading(true)
    api.post('login', loginData).then(res => {
      console.log('FEZ LOGIN')
      localStorage.setItem('token', res.data.token)
      return navigate('/dashboard')
    }).catch(err => {
      toast.error("Não foi possível autenticar esse usuário")
      console.log(err);
      setLoading(false);
    })
  };

  return (
    <div className='form-box full-width full-height'>
      <Header />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      {isLoading ? <div className='form-box full-width full-height'><div className="full-width flex-center"><CircularProgress /></div></div> : (
        <div className='form-box full-width full-height'>
          <div className='form-box form-container'>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='button-box'>
                <button type="submit">Login</button>
              </div>
              <div className="no-account">
                <p>Ainda não possui conta? Cadastre-se</p>
              </div>
            </form>
          </div>

        </div>
      )}
      <Footer />
    </div>
  );
};

export default Login;