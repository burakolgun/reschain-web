import { userConstant } from '../Constant/userConstant';
import { apiService } from "../Services/apiService";
import { history } from '../Helpers/history';

export const userActions = {
    register,    
};

function register(mail, pw, name) {
    return dispatch => {
        dispatch(request());
        let userName = name;
        apiService.register(mail, pw, name)
            .then(
                response => {
                    if (response.data.success) {
                        console.log(userName);
                        dispatch(success(userName, response.data.message));
                    } else {
                        console.log(response.data.error);
                        dispatch(credentialError(response.data.error));
                    }
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() {
        return {
            type: userConstant.REGISTER_REQUEST, payload: {
                loading: true,
            }
        }
    }

    function success(userName, message) {
        return {
            type: userConstant.REGISTER_SUCCESS, payload: {
                loading: false,
                name: userName,
                message: message,
            }
        }
    }

    function failure(message) {
        return {
            type: userConstant.REGISTER_FAILURE, payload: {
                loading: false,
                message: message,
            }
        }
    };

    function credentialError(message) {
        return {
            type: userConstant.REGISTER_ERROR, payload: {
                loading: false,
                message: message,
            }
        }
    }
}