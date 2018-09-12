import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Servers from './components/Servers';
import Tables from './components/Tables';
import NotFound from './components/NotFound';

import RequireNotAuth from './components/HOC/RequireNotAuth';
import RequireAuth from './components/HOC/RequireAuth';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Landing} exact />
          <Route path="/login" component={RequireNotAuth(Login)} />
          <Route path="/register" component={RequireNotAuth(Register)} />
          <Route path="/tables" component={RequireAuth(Tables)} />
          <Route path="/servers" component={RequireAuth(Servers)} />
          <Route path="/404" component={NotFound} exact />
          <Redirect to="/404" />
        </Switch>
      </Router>
    );
  }
}

export default App;
