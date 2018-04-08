
let initialState = {
    token: "",
    userName: ""
};

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_TOKEN":
            return Object.assign({}, state, {
                token: action.payload.token,
            })
    }
    return state
}