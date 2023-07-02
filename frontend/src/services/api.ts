import axios from 'axios'


const api = axios.create({
    baseURL:'http://127.0.0.1:8000/api/',
    
})
const authToken = `Bearer ${localStorage.getItem('token')}`
api.defaults.headers.common = {'Authorization': `bearer ${authToken}`}

export default api;