import axios from "axios";
const token = localStorage.getItem('token');
if(!token){
    console.log(token);
}
console.log(token);

const axiosPrivate = axios.create({ baseURL: 'http://localhost:3001/api' });


  export default axiosPrivate;