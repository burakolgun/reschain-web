import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import createHistory from 'history/createBrowserHistory';
import App from './Components/App';
import { ConnectedRouter } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './Redux/configureStore';
import './Asset/css/bootstrap-grid.css';

const history = createHistory();
const store = configureStore(undefined, history);

const render = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Component/>
            </ConnectedRouter>
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
