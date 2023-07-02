import React from 'react';
import './styles.css'
import Logo from '../../assets/clean_logo.png'

const EditTravel: React.FC = () => {

    return (
        <div className='edit-travel'>
           <img alt='logo' src={Logo}></img>
        </div>
    );
};

export default EditTravel;