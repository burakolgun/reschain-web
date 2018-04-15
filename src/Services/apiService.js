import { authHeader } from '../Helpers/authHeader';
import { Redirect } from 'react-router-dom';

import axios from 'axios'

export const apiService = {
    login,
    logout,
    register
};

const baseApiUrl = "http://localhost:4000/api/";

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

    axios.post(baseApiUrl + 'login', body, requestOptions )
        .then(function (response) {
            if (response.data.token)
            {
                localStorage.setItem('token', response.data.token);
            }

            if (response.data.data.token)
            {

                localStorage.setItem('token', response.data.data.token);
            }
        })
        .catch(function (error) {
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
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
    return fetch('chain', requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}