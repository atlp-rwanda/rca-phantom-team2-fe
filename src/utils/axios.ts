import axios from "axios";
import baseUrl from "./url";

const defaultOptions = {
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
};

const instance = axios.create(defaultOptions);

instance.interceptors.request.use(function(config) {
  const token = localStorage.getItem("userToken");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default instance;
