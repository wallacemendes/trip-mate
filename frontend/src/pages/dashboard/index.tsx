import React, { useEffect, useState } from 'react';
import './styles.css'
import Header from '../../components/header/intex';
import { Button } from '@mui/material';
import api from '../../services/api';

const Dashboard: React.FC = () => {

    const [trips, setTrips] = useState()

    useEffect(() => {
        api.get('/trips').then(res => {
            console.log(res.data)
            setTrips(res.data.data)
        })
    },[])

    return (
        <div className='main-dashboard'>
            <Header></Header>
            <div className='dashboard-container'>
                <div className='flex-center'>
                    <h2>Minhas viagens</h2>
                </div>
                <div className='button-box'>
                    <Button variant="outlined">+ Nova viagem</Button>
                </div>
                <div className='travel-board'>

                </div>

            </div>
        </div>
    );
};

export default Dashboard;