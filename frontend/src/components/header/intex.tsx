import React, { useEffect, useState } from 'react';
import './styles.css'
import Logo from '../../assets/clean_logo.png'
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate()
    const [userName, setName] = useState<string>('');

    useEffect(() => {
        const name = localStorage.getItem('userName');
        if(name != null){
            setName(name);
        }
    }, [])

     function navigateDashboard(){
        return navigate('/dashboard')
     }

     function verifyLogIn(){
        return localStorage.getItem('userName') != null ? 'flex-left' : '';
     }

    return (
        <div onClick={navigateDashboard} className={`header-ok ${verifyLogIn()}`}>
           <img alt='logo' src={Logo}></img>
           {userName != null && userName !== '' && <p>{userName}</p>}
        </div>
    );
};

export default Header;