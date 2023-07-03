import React, { useState } from 'react';
import './styles.css'
import Header from '../../components/header/intex';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

interface FormProps{
    title:string,
    startDate:string,
    endDate: string,
    location: string,
    currency: string,
    budget: string
}

const NewTravel: React.FC = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState<FormProps>({
        title:'',
        startDate:'',
        endDate: '',
        location: '',
        currency: '',
        budget: ''
      });


      const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const form = {
            ...formData,
            startDate: new Date(formData.startDate).toISOString().slice(0,10),
            endDate: new Date(formData.endDate).toISOString().slice(0,10)
        }
        api.post('trips', form ).then((res) => {
            console.log(res.data);
            return navigate('/dashboard')
        })
        .catch(err => console.log(err))
       
      };


    return (
        <div className='new-travel'>
            <Header/>
            <div className='create-travel-box'>
                <h2>Nova viagem</h2>
                <div className='form-box form-container wider-trav'>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Título</label>
              <TextField
                id="title"
                name="title"
                defaultValue={formData.title}
                onChange={(event) => setFormData({...formData, title: event.target.value})}
                required
              />
            </div>
            <div>
              <label htmlFor="startDate">Data de Ida</label>
              <DatePicker 
               value={dayjs(formData.startDate)}
               onChange={(event: any) => setFormData({...formData, startDate: `${event}`})}
              />
            </div>
            <div>
              <label htmlFor="endDate">Data de Volta</label>
              <DatePicker 
               value={dayjs(formData.endDate)}
               onChange={(event: any) => setFormData({...formData, endDate: `${event}`})}
              />
            </div>
            <div>
              <label htmlFor="location">Localização</label>
              <TextField
                id="location"
                name="location"
                defaultValue={formData.location}
                onChange={(event) => setFormData({...formData, location: event.target.value})}
                required
              />
            </div>
            <div>
              <label htmlFor="currency">Moeda Local</label>
              <TextField
                id="currency"
                name="currency"
                defaultValue={formData.currency}
                onChange={(event) => setFormData({...formData, currency: event.target.value})}
                required
              />
            </div>
            <div>
              <label htmlFor="budget">Orçamento</label>
              <TextField
                id="budget"
                name="budget"
                defaultValue={formData.budget}
                onChange={(event) => setFormData({...formData, budget: event.target.value})}
                required
              />
            </div>
            <div className='button-box'>
              <button type="submit">Criar</button>
            </div>
          </form>
        </div>

            </div>
        </div>
    );
};

export default NewTravel;