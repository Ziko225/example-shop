import axios from "axios";

const baseURL = "http://localhost:3000/api";

export const $host = axios.create({
    baseURL
});

export const $authHost = axios.create({
    baseURL,
    headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
});