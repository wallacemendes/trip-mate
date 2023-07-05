import React, { useEffect, useState } from 'react';
import './styles.css'
import Logo from '../../assets/clean_logo.png'
import Header from '../../components/header/intex';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, CircularProgress, Modal, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import dayjs from 'dayjs';
import { toast, Toaster } from 'react-hot-toast';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import IconButton from '@mui/joy/IconButton';
import Delete from '@mui/icons-material/Delete';
import ModalDelete from '../../components/delete-trip';

interface FormProps {
    title: string,
    startDate: string,
    endDate: string,
    location: string,
    currency: string,
    budget: string
}

const EditTravel: React.FC = () => {

    const { id } = useParams();


    const navigate = useNavigate()

    const [isLoading, setLoading] = useState<boolean>(true);
    const [showModalDelete, setShowModal] = useState<boolean>(false);

    const [formData, setFormData] = useState<FormProps>({
        title: '',
        startDate: '',
        endDate: '',
        location: '',
        currency: '',
        budget: ''
    });

    const styleModal = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        setLoading(true)
        api.get(`trips/${id}`).then((res: any) => {
            setFormData({
                ...res.data.data,
            })
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            toast.error("Erro ao obter dados da viagem")
        })
    }, [id])


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const form = {
            ...formData,
            startDate: new Date(formData.startDate).toISOString().slice(0, 10),
            endDate: new Date(formData.endDate).toISOString().slice(0, 10)
        }
        setLoading(true)
        api.put(`trips/${id}`, form).then((res) => {
            console.log(res.data);
            setLoading(false)
            return navigate('/viagem/' + id)
        })
            .catch(err => {
                console.log(err)
                setLoading(false)
                toast.error("Não foi possível editar a viagem")
            })

    };

    const handleChange = (
        event: React.SyntheticEvent | null,
        newValue: string | null,
      ) => {
        setFormData({ ...formData, currency: newValue! });
      };

      function handleClose() {
        setShowModal(false)
    }
      

    return (
        <div className='edit-travel'>
            <Header />
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='create-travel-box '>
                <h2>Editar viagem</h2>
                {isLoading ? <div className="full-width flex-center"><CircularProgress /></div> : (
                    <div className='form-box form-container wider-trav form-shadow'>
                        <div className='delete-trip-box'>
                            <IconButton onClick={() => setShowModal(true)} color="danger" variant="outlined"><Delete/></IconButton>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email">Título</label>
                                <TextField
                                    id="title"
                                    name="title"
                                    defaultValue={formData.title}
                                    onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="startDate">Data de Ida</label>
                                <DatePicker
                                    defaultValue={dayjs(formData.startDate)}
                                    onChange={(event: any) => setFormData({ ...formData, startDate: `${event}` })}
                                />
                            </div>
                            <div>
                                <label htmlFor="endDate">Data de Volta</label>
                                <DatePicker
                                    defaultValue={dayjs(formData.endDate)}
                                    onChange={(event: any) => setFormData({ ...formData, endDate: `${event}` })}
                                />
                            </div>
                            <div>
                                <label htmlFor="location">Localização</label>
                                <TextField
                                    id="location"
                                    name="location"
                                    defaultValue={formData.location}
                                    onChange={(event) => setFormData({ ...formData, location: event.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="currency">Moeda Local</label>
                                <Select defaultValue={formData.currency} onChange={handleChange}>
                                    <Option value="BRL">BRL</Option>
                                    <Option value="USD">USD</Option>
                                </Select>
                            </div>
                            <div>
                                <label htmlFor="budget">Orçamento</label>
                                <TextField
                                    id="budget"
                                    name="budget"
                                    defaultValue={formData.budget}
                                    onChange={(event) => setFormData({ ...formData, budget: event.target.value })}
                                    required
                                />
                            </div>
                            <div className='button-box'>
                                <button type="submit">Salvar</button>
                            </div>
                        </form>
                    </div>
                )}

            </div>
            <Modal
                open={showModalDelete}
                onClose={() => handleClose()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <ModalDelete id={Number(id)} handleClose={() => handleClose()} />
                </Box>
            </Modal>
        </div>
    );
};

export default EditTravel;