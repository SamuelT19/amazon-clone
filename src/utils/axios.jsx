import axios from "axios";

export const base = axios.create({
  baseURL: `https://api.escuelajs.co/api/v1/`,
});

export const functionAxios = axios.create({
  baseURL: `https://amazon-api-mx0h.onrender.com`
  // baseURL:`http://localhost:4444/`
});