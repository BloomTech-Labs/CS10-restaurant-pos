import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import App from './App';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

import RequireAuth from './HOC/RequireAuth';
const Authed = RequireAuth(App);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Authed />
  </Provider>,
  document.getElementById('root')
);
