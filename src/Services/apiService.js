import { authHeader } from '../Helpers/authHeader';
import { Redirect } from 'react-router-dom';

import axios from 'axios'

export const apiService = {
    login,
    logout,
    register,
    getChains,
};

const baseApiUrl = "http://www.reschain.com/api/";

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    const body = JSON.stringify(
        {
            email,
            password
        }
    );

    return axios.post(baseApiUrl + 'login', body, requestOptions);
}

function logout() {
    // remove user from local storage to log user out
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return axios.get(baseApiUrl + 'logout', requestOptions);
}

function register(email, password, name) {
    console.log(email, password, name);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    const body = JSON.stringify(
        {
            email,
            password,
            name
        }
    );

    return axios.post(baseApiUrl + 'register', body, requestOptions)
}

function getChains() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return axios.get(baseApiUrl + 'chain', requestOptions); 
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}
