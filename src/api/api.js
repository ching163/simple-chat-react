import axios from 'axios';

export default axios.create({
    // REACT_APP must be added before env variable
    baseURL: process.env.REACT_APP_API_URL,
});