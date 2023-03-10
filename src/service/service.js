import axios from "axios";

// Frontend is running on http://localhost:5173

// Backend is running on http://localhost:5005

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const myApi = axios.create({
  baseURL: BACKEND_URL,
});

myApi.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "token"
      )}`;
    }
    return config;
  },
  function (error) {
    console.error(error);
  }
);

export default myApi;
