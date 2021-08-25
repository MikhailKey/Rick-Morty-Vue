import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://rickandmortyapi.com/api/character",
});

export default axiosInstance;
