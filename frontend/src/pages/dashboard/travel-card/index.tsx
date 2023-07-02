import React from 'react';
import './styles.css'
import Logo from '../../assets/clean_logo.png'
import { useNavigate } from 'react-router-dom';

export interface CardProps {
    id: number,
    title: string,
    startDate: string,
    endDate: string,
    location: string,
    currency: string,
    budget: string,
    userId: number
}

const TravelCard = (travel: CardProps): JSX.Element  => {

    const navigate = useNavigate()

    function formatDate(date: string){
        const dt = date.split('-').reverse().join('/');
        return dt;
    }

    function navigateToTravel(){
        return navigate(`/viagem/${travel.id}`)
    }

    

    return (
        <div onClick={navigateToTravel} className='travel-card'>
            <h3>{travel.title}</h3>
            <p>Local: {travel.location}</p>
            <p>Ida :{formatDate(travel.startDate)}</p>
            <p>Volta: {formatDate(travel.endDate)}</p>
        </div>
    );
};

export default TravelCard;