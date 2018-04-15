import { userConstant } from '../Constant/userConstant';
import { apiService } from "../Services/apiService";
import { history } from '../Helpers/history';

export const userActions = {
    register,
    login,
};

function register(mail, pw, name) {
    return dispatch => {
        dispatch(request(false));
        let userName = name;
        apiService.register(mail, pw, name)
            .then(
                response => {
                    if (response.data.success) {
                        dispatch(success(userName, response.data.message, false));
                    } else {
                        console.log(response.data.error);
                        dispatch(credentialError(response.data.error, false));
                    }
                },
                error => {
                    dispatch(failure(error, false));
                }
            );
    };
}

function login(mail, pw) {
    return dispatch => {
        dispatch(request(true));
        apiService.login(mail, pw)
            .then(
                response => {
                    console.log(response);
                    if (response.data.success) {
                        if (response.data.token)
                        {
                            dispatch(success(response.data.name, response.data.message, true));
                            localStorage.setItem('token', response.data.token);
                        }
            
                        if (response.data.data.token)
                        {
                            dispatch(success(response.data.name, response.data.message, true));            
                            localStorage.setItem('token', response.data.data.token);
                        }                        
                    } else {
                        console.log(response.data.error);
                        dispatch(credentialError(response.data.error, true));
                    }
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
}

function request(type) {
    return {
        type: userConstant.REGISTER_REQUEST, payload: {
            loading: true,
            type: type,
        }
    }
}

function success(userName, message, type) {
    return {
        type: userConstant.REGISTER_SUCCESS, payload: {
            loading: false,
            name: userName,
            message: message,
            type: type,
        }
    }
}

function failure(message, type) {
    return {
        type: userConstant.REGISTER_FAILURE, payload: {
            loading: false,
            message: message,
            type: type,
        }
    }
};

function credentialError(message, type) {
    return {
        type: userConstant.REGISTER_ERROR, payload: {
            loading: false,
            message: message,
            type: type,
        }
    }
}


