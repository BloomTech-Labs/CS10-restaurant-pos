import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';

import { requireManager } from './redux/middleware/permissions';
import { axiosAuth } from './redux/middleware/axios';
import reducer from './redux/reducers';
import App from './App';
import { theme } from './global-styles/variables';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import 'axios-progress-bar/dist/nprogress.css';

const history = createBrowserHistory();

let store;
if (process.env.NODE_ENV === 'production') {
  store = createStore(
    connectRouter(history)(reducer),
    applyMiddleware(routerMiddleware(history), thunk, requireManager, axiosAuth)
  );
} else {
  // eslint-disable-next-line global-require
  const logger = require('redux-logger').default;
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(
    connectRouter(history)(reducer),
    composeEnhancers(
      applyMiddleware(routerMiddleware(history), thunk, requireManager, axiosAuth, logger)
    )
  );
}

const AppWithRouter = withRouter((props) => <App {...props} />);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <AppWithRouter />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
