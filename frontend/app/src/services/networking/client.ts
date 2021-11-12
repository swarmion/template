import axios from 'axios';

const baseApiUrl = process.env.VITE_API_URL;

const client = axios.create({ baseURL: baseApiUrl });

export default client;
