import axios from "axios";

export const base = axios.create({
  baseURL: `https://fakestoreapi.com/`,
});

export const functionAxios = axios.create({
  baseURL: `https://amazon-api-mx0h.onrender.com`
  // baseURL:`http://localhost:4444/`
});