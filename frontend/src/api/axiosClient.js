import axios from "axios";

const LOCAL_API_URL = "http://127.0.0.1:8000";
const PRODUCTION_API_URL =
  "https://dynamic-active-backend-production.up.railway.app";

function getBaseURL() {
  const envURL = import.meta.env.VITE_API_BASE_URL;

  if (envURL && envURL.trim() !== "") {
    return envURL;
  }

  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  return isLocalhost ? LOCAL_API_URL : PRODUCTION_API_URL;
}

const axiosClient = axios.create({
  baseURL: getBaseURL(),
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("dynamic_active_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;
