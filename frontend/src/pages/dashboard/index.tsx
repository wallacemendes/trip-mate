import React, { useEffect, useState } from 'react';
import './styles.css'
import Header from '../../components/header/intex';
import { Button, CircularProgress } from '@mui/material';
import api from '../../services/api';
import TravelCard, { CardProps } from './travel-card';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import IconButton from '@mui/joy/IconButton';
import Plus from '@mui/icons-material/Add';


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
        }).catch(err => {
            console.log(err);
            setTrips([]);
            setIsLoading(false);
            toast.error("Ocorreu um erro ao buscar viagems")
        })
    }, [])

    function navigateNewTravel() {
        return navigate("/nova-viagem")
    }

    return (
        <div className='main-dashboard'>
            <Header />
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {isLoading ? <div className="full-width flex-center"><CircularProgress /></div> : trips.length > 0 && (
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
            {!isLoading && trips.length === 0 && (
                <div className='dashboard-container'>
                    <div className='welcome-text'>
                        <h2>Olá {localStorage.getItem('userName') || 'usuário'},</h2>
                        <h2>Você ainda não tem nenhuma viagem programada.</h2>
                    </div>
                    <div onClick={navigateNewTravel} className='box-create-trip form-shadow'>
                        <h2>CRIAR VIAGEM</h2>
                        <IconButton  variant="outlined">
                            <Plus />
                        </IconButton>
                    </div>

                </div>
            )}

        </div>
    );
};

export default Dashboard;