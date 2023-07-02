import React, { useEffect, useState } from 'react';
import './styles.css'
import Header from '../../components/header/intex';
import { Button, CircularProgress } from '@mui/material';
import api from '../../services/api';
import TravelCard, { CardProps } from './travel-card';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {

    const navigate = useNavigate()

    const [trips, setTrips] = useState([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        api.get('/trips').then(res => {
            console.log(res.data)
            setTrips(res.data.data)
            setIsLoading(false)
        })
    }, [])

    function navigateNewTravel() {
        return navigate("/nova-viagem")
    }

    return (
        <div className='main-dashboard'>
            <Header></Header>
            {isLoading ? <div className="full-width flex-center"><CircularProgress /></div> : (
                <div className='dashboard-container'>
                    <div className='flex-center'>
                        <h2>Minhas viagens</h2>
                    </div>
                    <div onClick={navigateNewTravel} className='button-box'>
                        <Button variant="outlined">+ Nova viagem</Button>
                    </div>
                    <div className='travel-board'>
                        {trips.map((trip: CardProps) => {
                            return <TravelCard {...trip} />
                        })}

                    </div>

                </div>
            )}

        </div>
    );
};

export default Dashboard;