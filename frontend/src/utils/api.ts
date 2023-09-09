import axios from "axios";
import { getLocalStorage } from "./localStorage";
import { USER_TOKEN } from "./variables";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_APP_BASE_URL}/api`,
});

const abortController = new AbortController();

// Handle all configuration of request
api.interceptors.request.use((config) => {
    const token = getLocalStorage(USER_TOKEN);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Handle errors of all responses
api.interceptors.response.use(
    (res) => {
        return res.data;
    },
    (err) => Promise.reject(err.response?.data)
);

export { abortController };
export default api;
