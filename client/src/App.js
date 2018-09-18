import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Container } from './styles';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import LoginEmployee from './components/LoginEmployee';
import CreateEmployee from './components/CreateEmployee';
import Servers from './components/Servers';
import TablesPage from './components/TablesPage';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import PartyPage from './components/PartyPage';
import Settings from './components/Settings';
import RequireNotAuth from './components/HOC/RequireNotAuth';
import RequireAuth from './components/HOC/RequireAuth';
import Test from './components/Test';

class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Navbar modalIsOpen={this.props.modalIsOpen} />
          <Switch>
            <Route path="/" component={Landing} exact />
            <Route path="/login" component={RequireNotAuth(Login)} />
            <Route path="/register" component={RequireNotAuth(Register)} />
            <Route path="/login-employee" component={RequireAuth(LoginEmployee)} />
            <Route path="/new-employee" component={RequireAuth(CreateEmployee)} />
            <Route path="/tables" component={RequireAuth(TablesPage)} />
            <Route path="/servers" component={RequireAuth(Servers)} />
            <Route path="/party" component={RequireAuth(PartyPage)} />
            <Route path="/settings" component={RequireAuth(Settings)} />
            <Route path="/test" component={RequireAuth(Test)} />
            <Route path="/404" component={NotFound} exact />
            <Redirect to="/404" />
          </Switch>
        </Container>
      </Router>
    );
  }
}

App.propTypes = {
  modalIsOpen: PropTypes.bool
};

App.defaultProps = {
  modalIsOpen: false
};

const mapStateToProps = (state) => ({
  modalIsOpen: state.modal.isOpen
});

export default connect(mapStateToProps)(App);
