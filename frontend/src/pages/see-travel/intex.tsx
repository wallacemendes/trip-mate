import React, { useEffect, useState } from 'react';
import './styles.css'
import Logo from '../../assets/clean_logo.png'
import Header from '../../components/header/intex';
import api from '../../services/api';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';

const SeeTravel: React.FC = () => {

    const navigate = useNavigate()

    const [trips, setTrips] = useState([])
    const [searchParams] = useSearchParams();
    const {id} = useParams()

    useEffect(() => {
        api.get('/trips').then(res => {
            console.log(res.data)
            setTrips(res.data.data)
        })
    }, [])

    function navigateNewTravel(){
       
        return navigate(`/editar-viagem/${id}`)
    }

    return (
        <div className='see-travel'>
            <Header/>
            <div className='dashboard-container'>
                <div className='flex-center'>
                    <h2>Atividades da viagem</h2>
                </div>
                <div onClick={navigateNewTravel} className='button-box'>
                    <Button variant="outlined">Editar viagem</Button>
                </div>
                <div className='travel-board'>
                    
                </div>
            </div>
        </div>
    );
};

export default SeeTravel;