import axios from "axios";

var instance = axios.create({
    baseURL: 'http://localhost:3001',
  });

export default instance;
