import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://test-match-server.onrender.com/api',
});

export default instance;
