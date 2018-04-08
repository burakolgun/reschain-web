import { store } from '../../index';

export function setToken(token) {
    store.dispatch({
        type: "SET_TOKEN",
        payload: {
            token
        }
    })
    
}