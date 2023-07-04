import React, { useState } from 'react';
import './styles.css'
import Logo from '../../assets/clean_logo.png'
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Header from '../../components/header/intex';
import { Toaster, toast } from 'react-hot-toast';
import api from '../../services/api';

interface FormProps {
    name: string,
    lastName: string,
    email: string,
    password: string,
}

const SignUp: React.FC = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState<FormProps>({
        name: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [isLoading, setLoading] = useState<boolean>(false)
    const [checkPassword, setCheckPassword] = useState('')

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (checkPassword !== formData.password) {
            toast.error("As senhas não correspondem")
        } else {
            setLoading(true)
            const form = {
                ...formData,
            }
            console.log(form)
            api.post('register', form).then((res) => {
                console.log(res.data);
                setLoading(false)
                toast.success("Conta criada com sucesso !")
                return navigate('/')
            })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                    toast.error("Não foi possível criar conta")
                })
        }

    };

    function verifyPassword(){
        return checkPassword !== "" && formData.password !== checkPassword;
    }



    return (
        <div className='new-travel'>
            <Header />
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='create-travel-box'>
                <h2>Cadastre-se no sistema</h2>
                <div className='form-box form-container wider-trav form-shadow'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name">Nome</label>
                            <TextField
                                id="name"
                                name="name"
                                defaultValue={formData.name}
                                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName">Sobrenome</label>
                            <TextField
                                id="lastName"
                                name="lastName"
                                defaultValue={formData.lastName}
                                onChange={(event) => setFormData({ ...formData, lastName: event.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <TextField
                                id="email"
                                name="email"
                                defaultValue={formData.email}
                                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Senha</label>
                            <TextField
                                id="password"
                                name="password"
                                type='password'
                                defaultValue={formData.password}
                                onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Confirme a senha</label>
                            <TextField
                                id="password"
                                name="password"
                                type='password'
                                defaultValue={checkPassword}
                                onChange={(event) => setCheckPassword(event.target.value)}
                                required
                            />
                        </div>
                        {verifyPassword() ? <p className='error-red'>As senhas não correpondem</p> : ''}
                        <div className='button-box'>
                            <button type="submit">Criar</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default SignUp;