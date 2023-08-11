import axios from 'axios';

const apiKey = process.env.REACT_APP_KEY;

const tmdbService = axios.create({
  baseURL: process.env.REACT_APP_API,
  params: {
    api_key: apiKey,
  },
});

export default tmdbService;
