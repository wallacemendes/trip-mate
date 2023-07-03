import React from 'react';
import './styles.css'
import Logo from '../../assets/clean_logo.png'
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
    const navigate = useNavigate()

     function navigateDashboard(){
        return navigate('/dashboard')
     }

    return (
        <div onClick={navigateDashboard} className='sign-up'>
           <img alt='logo' src={Logo}></img>
        </div>
    );
};

export default SignUp;