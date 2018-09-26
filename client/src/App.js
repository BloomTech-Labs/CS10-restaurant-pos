import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { setInitialAuth } from './redux/actions/auth';
import * as s from './styles';
import Landing from './components/Landing';
import Logout from './components/Logout';
import Login from './components/Login';
import Register from './components/Register';
import RegistrationSuccess from './components/RegistrationSuccess';
import LoginEmployee from './components/LoginEmployee';
import CreateEmployee from './components/CreateEmployee';
import Servers from './components/Servers';
import TablesPage from './components/TablesPage';
import NotFound from './components/Presentational/NotFound';
import Navbar from './components/Presentational/Navbar';
import PartyPage from './components/Container/PartyPage';
import Settings from './components/Container/Settings';
import Sidebar from './components/Presentational/Sidebar';
import NewRestaurant from './components/NewRestaurant';
import RequireNotAuth from './components/HOC/RequireNotAuth';
import RequireAuth from './components/HOC/RequireAuth';
import { sidebar } from './config/conditionalPathnames';

const AuthedPartyPage = RequireAuth(PartyPage);
const AuthedLoginEmployee = RequireAuth(LoginEmployee);
const AuthedNewRestaurant = RequireAuth(NewRestaurant);
const AuthedCreateEmployee = RequireAuth(CreateEmployee);
const AuthedTablesPage = RequireAuth(TablesPage);
const AuthedServers = RequireAuth(Servers);
const AuthedSettings = RequireAuth(Settings);

const NotAuthedLogin = RequireNotAuth(Login);
const NotAuthedRegsiter = RequireNotAuth(Register);

class App extends Component {
  componentDidMount() {
    this.props.setInitialAuth();
  }

  render() {
    const { modalIsOpen, role, location, history } = this.props;
    return (
      <s.Container>
        <Navbar blur={modalIsOpen} />
        <s.Main>
          <Sidebar
            blur={modalIsOpen}
            role={role}
            visible={!sidebar.includes(location.pathname)}
            pathname={location.pathname}
            push={history.push}
          />
          <Switch>
            <Route path="/" component={Landing} exact />
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={NotAuthedLogin} />
            <Route path="/register" component={NotAuthedRegsiter} />
            <Route path="/success" component={RegistrationSuccess} />
            <Route path="/login-employee" component={AuthedLoginEmployee} />
            <Route path="/new-restaurant" component={AuthedNewRestaurant} />
            <Route path="/new-employee" component={AuthedCreateEmployee} />
            <Route path="/tables" component={AuthedTablesPage} />
            <Route path="/servers" component={AuthedServers} />
            <Route
              path="/party/:id"
              render={props => <AuthedPartyPage {...props} modalIsOpen={modalIsOpen} />}
            />
            <Route path="/settings" component={AuthedSettings} />
            <Route path="/404" component={NotFound} exact />
            <Redirect to="/404" />
          </Switch>
        </s.Main>
      </s.Container>
    );
  }
}

App.propTypes = {
  modalIsOpen: PropTypes.bool,
  role: PropTypes.shape({
    admin: PropTypes.bool,
    manager: PropTypes.bool
  }),
  setInitialAuth: PropTypes.func
};

App.defaultProps = {
  modalIsOpen: false,
  role: { admin: false, manager: false },
  setInitialAuth: () => {}
};

const mapStateToProps = state => ({
  modalIsOpen: state.modal.isOpen,
  role: state.auth.role
});

export default connect(
  mapStateToProps,
  { setInitialAuth }
)(App);
