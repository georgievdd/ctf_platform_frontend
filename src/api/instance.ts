import axios from "axios";

const HOST = "http://127.0.0.1";
const PORT = 8080;
const VERSION = '/api/v1';
export const API_URL = `${HOST}:${PORT}${VERSION}`;
// export const API_URL = 'https://8a0b-46-138-172-108.ngrok-free.app/api/v1';

export const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "withCredentials": true,
    // "ngrok-skip-browser-warning": true,
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
});


instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessJwt')}`;
  return config;
})