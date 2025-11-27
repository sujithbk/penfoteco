import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://penfoteco-backend.onrender.com',
    withCredentials: true, // Important for cookies/sessions
});

export default instance;
