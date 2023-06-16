import axios from "axios";

const baseURL = process.env.REACT_APP_HOST_URL + "/api";
const hostUrlIsSameClienUrl = process.env.REACT_APP_HOST_URL_IS_SAME_CLIENT_URL === "true";

export const $host = axios.create({
    baseURL,
    withCredentials: !hostUrlIsSameClienUrl,
});

export const $authHost = axios.create({
    baseURL,
    headers: {
        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
    },
    withCredentials: !hostUrlIsSameClienUrl,
});