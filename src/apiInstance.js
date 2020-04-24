import Axios from 'axios';

const axiosInstance = Axios.create({
  baseURL: 'https://heroapi.eu-gb.mybluemix.net/api/',
});

export default axiosInstance;
