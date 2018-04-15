import { userConstant } from '../../../Constant/userConstant';
let token = localStorage.getItem('token');

let initialState = token? {
    token: token,
    loggingIn: true,
} : {
    token: '',
    loggingIn: false,
    requestStatus: '',
    loading: false,
    message: '',
    userName: '',
};

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case userConstant.SET_REQUEST_STATUS:
            return Object.assign({}, state, {
                requestStatus: action.payload.requestStatus,
            });
        case userConstant.REGISTER_SUCCESS:
            return Object.assign({}, state, {
                loading: action.payload.loading,
                userName: action.payload.name,
                message: action.payload.message,
            });
        case userConstant.SET_TOKEN:
            return Object.assign({}, state, {
                token: action.payload.token,
            });
        case userConstant.REGISTER_REQUEST:
            return Object.assign({}, state, {
                loading: action.payload.loading,
                message: action.payload.message,
            });
        case userConstant.REGISTER_ERROR:
            return Object.assign({}, state, {
                loading: action.payload.loading,
                message: action.payload.message,
            });

        default: return state
    }
}