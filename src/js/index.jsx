import { fromJS } from 'immutable';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Import middleware
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './utils/createLogger';
import fetchMiddleware from './middlewares/fetchMiddleware';

// Import main reducer
import reducer from './reducer';
import INITIAL_STATE from '../../config/state.json';

// Import Components and Main Container
import App from './components/App/App.jsx';
import DevTools from './components/DevTools/DevTools.jsx';

// Create store
const storeFactoryWithMiddlewares = compose(
    applyMiddleware(thunkMiddleware, fetchMiddleware, loggerMiddleware),
    DevTools.instrument()
)(createStore);

// Add middleware to store
const store = storeFactoryWithMiddlewares(reducer, fromJS(INITIAL_STATE));

// Render application
render(
    <Provider store={store}>
        <div className="app__container">
            <App/>
            <DevTools/>
        </div>
    </Provider>,
    document.getElementById("app")
);