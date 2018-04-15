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
                        dispatch(success(userName));
                    } else {
                        console.log(response.data.error);
                        dispatch(credentialError());
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

    function success(userName) {
        return {
            type: userConstant.REGISTER_SUCCESS, payload: {
                loading: false,
                name: userName,
            }
        }
    }

    function failure(error) { return { type: userConstant.REGISTER_FAILURE, error } }

    function credentialError() {
        return {
            type: userConstant.REGISTER_ERROR, payload: {
                loading: false,
            }
        }
    }
}