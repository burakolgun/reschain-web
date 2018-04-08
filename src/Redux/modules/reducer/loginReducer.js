import { userConstant } from '../../../Constant/userConstant';
let token = localStorage.getItem('token');

let initialState = token? {
    token: token,
    loggingIn: true,
} : {
    token: '',
    loggingIn: false,
};

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case userConstant.SET_TOKEN:
            return Object.assign({}, state, {
                token: action.payload.token,
            });

        default: return state
    }
}