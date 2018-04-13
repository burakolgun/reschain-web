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
                console.log(response);
                localStorage.setItem('token', response.data.token);
            }

            if (response.data.data.token)
            {
                console.log(response, "2");

                localStorage.setItem('token', response.data.data.token);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
}

function register(email, password, name) {
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

    axios.post(baseApiUrl + 'register', body, requestOptions)
        .then(function (response) {       
            console.log("Register ok. ", response);
        })
        .catch(function (error) {
            console.log(error);
        });
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