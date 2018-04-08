import { userConstant } from '../../../Constant/userConstant';

let initialState = {
    userName: "",
    chains: {},
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case userConstant.SET_TOKEN:
            return Object.assign({}, state, {
                token: action.payload.token,
            });

        default: return state
    }
}