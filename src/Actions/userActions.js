import { userConstant } from '../Constant/userConstant';
import { apiService } from "../Services/apiService";

export const userActions = {
    register,
    login,
    logOut,
};

function register(mail, pw, name) {
    return dispatch => {
        dispatch(request(false));
        let userName = name;
        apiService.register(mail, pw, name)
            .then(
                response => {
                    if (response.data.success) {
                        debugger;
                        dispatch(login(mail, pw));
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

function logOut() {
    return dispatch => {
        apiService.logout()
        .then(
            response => {
                localStorage.removeItem('token');
                localStorage.removeItem('userName');
                if (response.data.success) {
                    dispatch(LogOutAction());
                } else {
                    console.log(response.data.message)
                }
            },
            error => {
                dispatch(failure(error));
            }
        )
        
    }
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
                            dispatch(loginSuccess(response.data.userName, response.data.message, true));
                            localStorage.setItem('token', response.data.token);
                            localStorage.setItem('userName', response.data.userName);

                        }
            
                        if (response.data.data.token)
                        {
                            console.log(response.data.data.userName);
                            dispatch(loginSuccess(response.data.data.userName, response.data.data.message, true));
                            localStorage.setItem('token', response.data.data.token);
                            localStorage.setItem('userName', response.data.data.userName);

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

function loginSuccess(userName, message, type) {
    return {
        type: userConstant.LOGIN_SUCCESS, payload: {
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
}

function credentialError(message, type) {
    return {
        type: userConstant.REGISTER_ERROR, payload: {
            loading: false,
            message: message,
            type: type,
        }
    }
}

function LogOutAction() {
    return {
        type: userConstant.DELETE_TOKEN, payload: {
            loggingIn: false,
        }
    }
}


