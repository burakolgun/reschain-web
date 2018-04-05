import createHistory from 'history/createBrowserHistory';
import configureStore from 'src/Redux/configureStore';

it('creates store successfully', () => {
    const history = createHistory();

    const store = configureStore(undefined, history);

    expect(store).toHaveProperty('dispatch');
    expect(store).toHaveProperty('getState');
});