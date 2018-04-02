import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

import rootReducer from './modules'

const configureStore = (preloadedStore) => {
    const middlewares = [
         thunk
    ];

    if (process.env.NODE_ENV === 'development') {
        middlewares.push(createLogger());
    }

    const composed = [applyMiddleware(...middlewares)];

    if (process.env.NODE_ENV === 'development') {
        composed.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    }

    if (process.env.NODE_ENV === 'development' && module.hot) {
        module.hot.accept('./modules', () => {
            const nextRootReducer = require('./modules').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    //Returned store

    const store = createStore(rootReducer,preloadedStore, compose(...composed));
    return store;
};

export default configureStore;