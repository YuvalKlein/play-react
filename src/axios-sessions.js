import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://play-e37a6.firebaseio.com/'
});

export default instance;