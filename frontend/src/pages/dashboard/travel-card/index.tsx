import React from 'react';
import './styles.css'
import Logo from '../../assets/clean_logo.png'

const TravelCard: React.FC = () => {

    return (
        <div className='travel-card'>
           <img alt='logo' src={Logo}></img>
        </div>
    );
};

export default TravelCard;