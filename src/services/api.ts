import axios from "axios";

export const vehiclesApi = axios.create({
  baseURL: import.meta.env.VITE_VEHICLES_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_VEHICLES_API_TOKEN}`,
  },
});
