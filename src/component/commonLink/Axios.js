import axios from 'axios';
const instance = axios.create({baseURL: 'http://192.168.0.235:4000/api'});
export default instance
