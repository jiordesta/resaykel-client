import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:3000", ///https://resaykel-server.onrender.com
  timeout: 50000,
  withCredentials: true,
});

export default AxiosInstance;
