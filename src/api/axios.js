import axios from "axios";

const api = axios.create({
  baseURL: "https://kcea-attendance-portal-backend.onrender.com",
});

export default api;
