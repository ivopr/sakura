import axios, { AxiosInstance } from "axios";

export function setupApiClient(): AxiosInstance {
  const api = axios.create({
    baseURL: "http://localhost:3000/api/",
  });

  return api;
}
