import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://resaykel-server.onrender.com", ///https://resaykel-server.onrender.com
  timeout: 50000,
  withCredentials: true,
});

export default AxiosInstance;
