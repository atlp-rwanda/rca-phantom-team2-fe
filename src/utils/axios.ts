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
  // const token = localStorage.getItem("userToken");
  // config.headers.Authorization = token ? `Bearer ${token}` : "";
  config.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyOWU1ZTcyYS0yNjgwLTNlZTMtNzBmMS0xNmQ3YThiNDFiMjIiLCJyb2xlSWQiOiI0OWE5Y2E0My0zZjkwLTQxN2YtOGNmZC03ZjFkZjAzMGE1ZTAiLCJpYXQiOjE2ODM2NTYxMjksImV4cCI6MTY4Mzc0MjUyOX0.KIkqQtNFSn_nueHXzeyoN2tTYckPpa7jox0aL41bqdw"
  return config;
});

export default instance;
