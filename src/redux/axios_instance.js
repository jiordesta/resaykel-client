import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 50000,
  withCredentials: true,
});

export default AxiosInstance;
