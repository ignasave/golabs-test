import axios from 'axios';

const instance = axios.create({
	withCredentials: true,
    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
	baseURL: 'http://localhost:5000/api',
});

export default instance;