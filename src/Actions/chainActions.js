import chainConstant from '../Constant/chainConstant';
import { userConstant } from '../Constant/userConstant';
import { apiService } from '../Services/apiService';

export const chainActions = {
    getChains,
}

function getChains() {
    return dispatch => {
        dispatch(request);
        apiService.getChains()
            .then(
                response => {
                    if (response.data) {
                        dispatch(success(response.data));
                    } else {
                        credentialError(response.data.error);
                    }
                },
                error => {
                    dispatch(failure(error));
                }
            )
    }
}

function request() {
    let type;
    return {
        type: userConstant.REGISTER_REQUEST, payload: {
            loading: true,
            type: type,
        }
    }
}

function success(chains) {
    let type;
    return {
        type: chainConstant.SET_CHAIN, payload: {
            loading: false,
            chains: chains,
            type: type,
        }
    }
}

function failure(message) {
    let type;
    return {
        type: userConstant.REGISTER_FAILURE, payload: {
            loading: false,
            message: message,
            type: type,
        }
    }
};

function credentialError(message) {
    let type;
    return {
        type: userConstant.REGISTER_ERROR, payload: {
            loading: false,
            message: message,
            type: type,
        }
    }
}