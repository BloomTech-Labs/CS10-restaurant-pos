import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
// import logger from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/reducers';

import App from './App';
import Landing from './Landing';
import Login from './Login';
import Register from './Register';
import './index.css';

// import registerServiceWorker from './registerServiceWorker';

import RequireNotAuth from './HOC/RequireNotAuth';
import RequireAuth from './HOC/RequireAuth';
const Authed = RequireAuth(App);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk /*logger*/))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.Fragment>
        <Route exact path="/" component={RequireNotAuth(Landing)} />
        <Route path="/login" component={RequireNotAuth(Login)} />
        <Route path="/register" component={RequireNotAuth(Register)} />
        <Authed />
      </React.Fragment>
    </Router>
  </Provider>,
  document.getElementById('root')
);
