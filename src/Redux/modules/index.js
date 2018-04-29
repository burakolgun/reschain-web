import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import loginReducer from './reducer/loginReducer';
import alertReducer from './reducer/alertReducer.';
import chainReducer from './reducer/chainReducer';

export default combineReducers({
    router: routerReducer,
    loginReducer: loginReducer,
    alertReducer: alertReducer,
    chainReducer: chainReducer,
});