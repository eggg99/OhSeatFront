import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'

export const axiosApi = (url, options = {}) => {
    return axios.create({
        baseURL: url,
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });
};

const axiosAuthApi = (url, options) => {
    const token = localStorage.getItem('userInformation')
    const instance = axios.create({
        baseURL : url,
        headers: {Authorization: 'Bearer ' + token },
        ...options,
    })
    return instance
}

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL)