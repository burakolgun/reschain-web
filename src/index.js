import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './Redux/configureStore';

const store = configureStore(undefined);

const render = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <Component/>
        </Provider>,
    document.getElementById('root'),
)};

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./Components/App', () => {
        const nextApp = require('./Components/App').default;
        render(nextApp);
    });
}
render(App);

registerServiceWorker();
