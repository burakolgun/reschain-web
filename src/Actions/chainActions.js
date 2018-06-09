import chainConstant from '../Constant/chainConstant';
import { userConstant } from '../Constant/userConstant';
import { apiService } from '../Services/apiService';

export const chainActions = {
    getChains,
    deleteChain,
    postChain,
    doDefault,
    newChain,
};

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

function postChain(chain, id) {
    return dispatch => {
        dispatch(request);
        apiService.postChain(chain, id)
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

function newChain(chain) {
    return dispatch => {
        dispatch(request);
        apiService.newChain(chain)
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

function deleteChain(id) {
    return dispatch => {
        dispatch(request);
        apiService.deleteChain(id)
            .then(
                response => {
                    if (response.data) {
                        dispatch(success(response.data));
                        dispatch(chainActions.getChains());
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

function doDefault(id) {
    return dispatch => {
        dispatch(request);
        apiService.doDefault(id)
            .then(
                response => {
                    if (response.data) {
                        dispatch(success(response.data));
                        dispatch(chainActions.getChains());
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
}

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