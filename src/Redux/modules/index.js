import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import loginReducer from './loginReducer';

export default combineReducers({
    router: routerReducer,
    loginReducer: loginReducer
});