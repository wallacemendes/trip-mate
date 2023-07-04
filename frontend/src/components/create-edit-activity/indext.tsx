import React, { useEffect, useState } from 'react';
import './styles.css'
import Logo from '../../assets/clean_logo.png'
import api from '../../services/api';
import { Button, CircularProgress, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { PlusOne } from '@mui/icons-material';
import { toast, Toaster } from 'react-hot-toast';

interface ModalProps {
    id: number
    tripId: number
    handleClose: () => void;
}

const ModalActivity = (props: ModalProps): JSX.Element => {

    const [isLoading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<any>({
        title: '',
        date: '',
        time: '',
        description: '',
        budget: '0'
    })
    const [isExpense, setExpense] = useState<boolean>(false)
 
    useEffect(() => {
        if (props.id !== 0) {
            setLoading(true);
            api.get(`trips/${props.tripId}/activities/${props.id}`).then(res => {
                setFormData({ ...res.data.data, time: res.data.data.time.slice(0, 5) })
                setLoading(false)
            })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                    toast.error("Erro ao recuperar atividade")
                })
        }
    }, [props.id, props.tripId])

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const form = {
            title: formData.title,
            date: new Date(formData.date).toISOString().slice(0, 10),
            time: formData.time,
            description: formData.description,
            budget: formData.budget,
        }
        console.log(form)
        setLoading(true)
        if (props.id !== 0) {
            api.put(`trips/${props.tripId}/activities/${props.id}`, form)
                .then(res => {
                    console.log(res.data)
                    props.handleClose()
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                    toast.error("Não foi possível salvar a atividade")
                })

        } else {
            api.post(`trips/${props.tripId}/activities`, form)
                .then(res => {
                    console.log(res.data)
                    props.handleClose()
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                    toast.error("Não foi possível criar a atividade")
                })
        }

    };


    return (
        <div className='modal-activity'>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {props.id === 0 ? <h2>Nova atividade</h2> : (
                <div className='flex-center gap'>
                    <h2>Editar atividade</h2> 
                    <div className='expense-box'>
                        <p>${formData.cost}</p>
                    </div>
                </div>
            )}
            {isLoading ? <div className="full-width flex-center padding-light"><CircularProgress /></div> : !isExpense && (
                <div className='form-box form-container wider-trav'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title">Título</label>
                            <TextField
                                id="title"
                                name="title"
                                defaultValue={formData.title}
                                onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="startDate">Data</label>
                            <DatePicker
                                defaultValue={dayjs(formData.date)}
                                onChange={(event: any) => setFormData({ ...formData, date: `${event}` })}
                            />
                        </div>
                        <div>
                            <label htmlFor="hora">Hora</label>
                            <TextField
                                id="hora"
                                name="hora"
                                defaultValue={formData.time}
                                onChange={(event) => setFormData({ ...formData, time: event.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Descrição</label>
                            <TextField
                                id="description"
                                name="description"
                                defaultValue={formData.description}
                                onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="budget">Orçamento</label>
                            <TextField
                                id="budget"
                                name="budget"
                                defaultValue={formData.budget}
                                onChange={(event) => setFormData({ ...formData, budget: event.target.value })}
                            />
                        </div>
                        <div className='button-box'>
                            <button type="submit">Salvar</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ModalActivity;