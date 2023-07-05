import React, { useState } from 'react';
import './styles.css'
import Header from '../../components/header/intex';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { toast, Toaster } from 'react-hot-toast';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

interface FormProps {
  title: string,
  startDate: string,
  endDate: string,
  location: string,
  currency: string,
  budget: string
}

const NewTravel: React.FC = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState<FormProps>({
    title: '',
    startDate: '',
    endDate: '',
    location: '',
    currency: '',
    budget: ''
  });
  const [isLoading, setLoading] = useState<boolean>(false)


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true)
    const form = {
      ...formData,
      budget: Number(formData.budget),
      startDate: new Date(formData.startDate).toISOString().slice(0, 10),
      endDate: new Date(formData.endDate).toISOString().slice(0, 10)
    }
    console.log(form)
    api.post('trips', form).then((res) => {
      console.log(res.data);
      setLoading(false)
      return navigate('/dashboard')
    })
      .catch(err => {
        console.log(err)
        setLoading(false)
        toast.error("Não foi possível criar nova viagem")
      })

  };

  const handleChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    setFormData({ ...formData, currency: newValue! });
  };


  return (
    <div className='new-travel'>
      <Header />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className='create-travel-box'>
        <h2>Nova viagem</h2>
        <div className='form-box form-container wider-trav form-shadow'>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Título</label>
              <TextField
                id="title"
                name="title"
                placeholder='Viagem à Paris'
                defaultValue={formData.title}
                onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="startDate">Data de Ida</label>
              <DatePicker
                value={dayjs(formData.startDate)}
                onChange={(event: any) => setFormData({ ...formData, startDate: `${event}` })}
              />
            </div>
            <div>
              <label htmlFor="endDate">Data de Volta</label>
              <DatePicker
                value={dayjs(formData.endDate)}
                onChange={(event: any) => setFormData({ ...formData, endDate: `${event}` })}
              />
            </div>
            <div>
              <label htmlFor="location">Localização</label>
              <TextField
                id="location"
                placeholder='Paris'
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
                <Option value="EUR">EUR</Option>
              </Select>
            </div>
            <div>
              <label htmlFor="budget">Orçamento</label>
              <TextField
                id="budget"
                name="budget"
                placeholder='5000.00'
                defaultValue={formData.budget}
                onChange={(event) => setFormData({ ...formData, budget: event.target.value })}
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