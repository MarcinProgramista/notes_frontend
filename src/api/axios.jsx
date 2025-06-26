import axios from "axios";
const BASE_URL = "http://localhost:3700";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: "http://localhost:3700",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
