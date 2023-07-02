import React from 'react';
import './styles.css'
import Logo from '../../assets/clean_logo.png'

const Header: React.FC = () => {

    return (
        <div className='header-ok'>
           <img alt='logo' src={Logo}></img>
        </div>
    );
};

export default Header;