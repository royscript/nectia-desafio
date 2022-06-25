import axios from "axios";
import BASE_URL from "./config";

const axiosPrivate = axios.create({ baseURL: BASE_URL });


  export default axiosPrivate;