import axios from "axios";
import API_CONFIG from "../config/api";

export default axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
