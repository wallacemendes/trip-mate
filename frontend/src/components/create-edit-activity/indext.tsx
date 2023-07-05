import React, { useEffect, useState } from 'react';
import './styles.css'
import Logo from '../../assets/clean_logo.png'
import api from '../../services/api';
import { Button, CircularProgress, TextField } from '@mui/material';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
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
        start: '',
        end: '',
        description: '',
        cost: ''
    })

    useEffect(() => {
        if (props.id !== 0) {
            setLoading(true);
            api.get(`trips/${props.tripId}/activities/${props.id}`).then(res => {
                setFormData({ ...res.data.data })
                setLoading(false)
            })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                    toast.error("Erro ao recuperar atividade")
                })
        }
    }, [props.id, props.tripId])

    function formatDate(date: Date) {
        date.setHours(date.getHours() -3);
        const formated = date.toISOString().split("T").join(" ").slice(0, 16)
        return formated
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const startDate = formatDate(new Date(formData.start))
        const endDate = formatDate(new Date(formData.end))
        console.log(endDate, startDate)

        const form = {
            title: formData.title,
            start: startDate,
            end: endDate,
            description: formData.description,
            cost: Number(formData.cost),
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
            {isLoading ? <div className="full-width flex-center padding-light"><CircularProgress /></div> : (
                <div className='form-box form-container wider-trav'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title">Título</label>
                            <TextField
                                id="title"
                                name="title"
                                placeholder='Passeio turístico'
                                defaultValue={formData.title}
                                onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="startDate">Início</label>
                            <DateTimePicker
                                defaultValue={dayjs(formData.start)}
                                onChange={(event: any) => setFormData({ ...formData, start: `${event}` })}
                            />
                        </div>
                        <div>
                            <label htmlFor="startDate">Fim</label>
                            <DateTimePicker
                                defaultValue={dayjs(formData.end)}
                                onChange={(event: any) => setFormData({ ...formData, end: `${event}` })}
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Descrição</label>
                            <TextField
                                id="description"
                                name="description"
                                placeholder='Passeio rápido pelo centro...'
                                defaultValue={formData.description}
                                onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="budget">Custo</label>
                            <TextField
                                id="budget"
                                name="budget"
                                placeholder='50.00'
                                defaultValue={formData.cost}
                                onChange={(event) => setFormData({ ...formData, cost: event.target.value })}
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