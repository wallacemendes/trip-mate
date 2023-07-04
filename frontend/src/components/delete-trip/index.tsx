import React from 'react';
import './styles.css'
import { Button } from '@mui/material';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

interface ModalProps {
    id: number
    handleClose: () => void;
}

const ModalDelete = (props: ModalProps): JSX.Element => {
    const navigate = useNavigate()

    function deleteTrip() {
        api.delete(`trips/${props.id}`)
            .then(res => {
                toast.success("Viagem apagada")
                navigate("/dashboard")
            })
            .catch(err => {
                toast.error("Não foi possível exluir essa viagem")
            })
    }

    return (
        <div className='modal-activity'>
            <h3>Tem certeza que deseja excluir essa viagem?</h3>
            <div className='modal-buttons'>
                <Button onClick={deleteTrip} color='error' variant='outlined'>Excluir</Button>
                <Button onClick={props.handleClose} variant='outlined'>Cancelar</Button>
            </div>
        </div>
    );
};

export default ModalDelete;