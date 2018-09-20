import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import { requireManager } from './redux/middleware/permissions';
import { axiosAuth } from './redux/middleware/axios';
import reducer from './redux/reducers';
import App from './App';

import './index.css';

// import registerServiceWorker from './registerServiceWorker';
let store;
if (process.env.NODE_ENV === 'production') {
  store = createStore(reducer, applyMiddleware(thunk, requireManager, axiosAuth));
} else {
  import('redux-logger')
    .then((logger) => {
      // eslint-disable-next-line no-underscore-dangle
      const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
      store = createStore(
        reducer,
        composeEnhancers(applyMiddleware(thunk, requireManager, axiosAuth, logger))
      );
    })
    .catch((err) => console.error(err));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
