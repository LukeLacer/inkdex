import axios from 'axios';
import axiosThrottle from 'axios-request-throttle';

const lorcastApi = axios.create({
  baseURL: process.env.REACT_APP_LORCAST_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosThrottle.use(lorcastApi, { requestsPerSecond: 10 });

export default lorcastApi;