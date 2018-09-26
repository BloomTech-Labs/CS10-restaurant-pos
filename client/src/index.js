import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import { requireManager } from './redux/middleware/permissions';
import { axiosAuth } from './redux/middleware/axios';
import reducer from './redux/reducers';
import App from './App';
import { theme } from './global-styles/variables';

import './index.css';

// import registerServiceWorker from './registerServiceWorker';
let store;
if (process.env.NODE_ENV === 'production') {
  store = createStore(reducer, applyMiddleware(thunk, requireManager, axiosAuth));
} else {
  // eslint-disable-next-line global-require
  const logger = require('redux-logger').default;
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk, requireManager, axiosAuth, logger))
  );
}

const AppWithRouter = withRouter(props => <App {...props} />);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <AppWithRouter />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);
