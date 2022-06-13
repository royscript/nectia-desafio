import axios from "axios";
const BASE_URL = 'http://localhost:3001/api';
export default axios.create({
    baseURL : BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 
        'Content-Type': 'application/json',
        authorization : localStorage.getItem('token')
     }
});

export const fetch= (token)=> fetch(BASE_URL,{
    method : 'POST',
    headers : {
        'Content-Type' : 'application/json',
        authorization : token
    }
});