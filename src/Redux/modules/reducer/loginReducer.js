import { userConstant } from '../../../Constant/userConstant';
let token = localStorage.getItem('token');
let userName = localStorage.getItem('userName');

let initialState = token? {
    token: token,
    loggingIn: true,
    userName: userName,
} : {
    token: '',
    userName: '',
    loggingIn: false,
    requestStatus: '',
    loading: false,
    message: '',  
    type: null,
};

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case userConstant.SET_TOKEN:
            return Object.assign({}, state, {
                token: action.payload.token,
                userName: action.payload.userName,
                loading: action.payload.loading,
            });
        case userConstant.SET_REQUEST_STATUS:
            return Object.assign({}, state, {
                requestStatus: action.payload.requestStatus,
                type: action.payload.type,
            });
        case userConstant.REGISTER_SUCCESS:
            return Object.assign({}, state, {
                loading: action.payload.loading,
                userName: action.payload.name,
                message: action.payload.message,
                type: action.payload.type,
                loggingIn: true,

            });
        case userConstant.REGISTER_REQUEST:
            return Object.assign({}, state, {
                loading: action.payload.loading,
                message: action.payload.message,
                type: action.payload.type,
            });
        case userConstant.REGISTER_ERROR:
            return Object.assign({}, state, {
                loading: action.payload.loading,
                message: action.payload.message,
                type: action.payload.type,
            });
        case userConstant.DELETE_TOKEN:
            return Object.assign({}, state, {
                loggingIn: false,
                userName: '',
            });
        case userConstant.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                loggingIn: true,
                userName: action.payload.name,
                loading: action.payload.loading,
            });

        default: return state
    }
}