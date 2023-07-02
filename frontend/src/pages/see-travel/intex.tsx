import React from 'react';
import './styles.css'
import Logo from '../../assets/clean_logo.png'

const SeeTravel: React.FC = () => {

    return (
        <div className='see-travel'>
           <img alt='logo' src={Logo}></img>
        </div>
    );
};

export default SeeTravel;