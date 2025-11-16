import axios from "axios";

const API_BASE_URL = "http://localhost:8000"

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials:true,
    headers:{
        'Content-Type':"application/json",
        "Accept":"application/json"
    }
})

export const getAuthToken = () => {
    return localStorage.getItem('access_token') || null;
}