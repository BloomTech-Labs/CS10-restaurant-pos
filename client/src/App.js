import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { StripeProvider } from 'react-stripe-elements';
import { ToastContainer } from 'react-toastify';

import { setInitialAuth } from './redux/actions/auth';
import * as s from './styles';
import Landing from './components/Presentational/Landing';
import Help from './components/Presentational/Help';
import Logout from './components/LogoutPage';
import Login from './components/Container/LoginPage';
import Register from './components/Container/RegisterPage';
import SuccessRegistration from './components/Presentational/SuccessRegistration';
import LoginEmployee from './components/Container/LoginEmployeePage';
import CreateEmployee from './components/Container/CreateEmployeePage';
import Servers from './components/Container/ServersPage';
import Menu from './components/Container/MenuPage';
import TablesPage from './components/Container/TablesPage';
import NotFound from './components/Presentational/NotFound';
import Topbar from './components/Container/Topbar';
import PartyPage from './components/Container/PartyPage';
import Settings from './components/Container/SettingsPage';
import Sidebar from './components/Presentational/Sidebar';
import NewRestaurant from './components/Container/CreateRestaurantPage';
import RequireNotAuth from './components/HOC/RequireNotAuth';
import RequireAuth from './components/HOC/RequireAuth';
import { sidebar } from './config/conditionalPathnames';

import 'react-toastify/dist/ReactToastify.css';

const AuthedPartyPage = RequireAuth(PartyPage);
const AuthedLoginEmployee = RequireAuth(LoginEmployee, true);
const AuthedNewRestaurant = RequireAuth(NewRestaurant, true);
const AuthedCreateEmployee = RequireAuth(CreateEmployee);
const AuthedTablesPage = RequireAuth(TablesPage);
const AuthedServers = RequireAuth(Servers);
const AuthedMenu = RequireAuth(Menu);
const AuthedSettings = RequireAuth(Settings);
const AuthedHelp = RequireAuth(Help);

const NotAuthedLogin = RequireNotAuth(Login);
const NotAuthedRegsiter = RequireNotAuth(Register);

const stripePK = 'pk_test_0axArT8SI2u6aiUnuQH2lJzg';

class App extends Component {
  state = {
    stripe: null
  };

  componentDidMount() {
    this.props.setInitialAuth();

    if (window.Stripe) {
      this.setState({ stripe: window.Stripe(stripePK) });
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({ stripe: window.Stripe(stripePK) });
      });
    }
  }

  render() {
    const { modalIsOpen, role, loggedIn, location, history } = this.props;

    return (
      <StripeProvider stripe={this.state.stripe}>
        <s.Container>
          <Topbar blur={modalIsOpen} />
          <s.Main>
            <ToastContainer
              className="toast-container"
              toastClassName="toast"
              bodyClassName="toast-body"
              progressClassName="toast-progress-bar"
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnVisibilityChange
              draggable
              pauseOnHover
            />
            <Sidebar
              blur={modalIsOpen}
              role={role}
              visible={
                (location.pathname === '/registration-success' && loggedIn)
                || !sidebar.includes(location.pathname)
              }
              pathname={location.pathname}
              push={history.push}
            />
            <Switch>
              <Route path="/" component={Landing} exact />
              <Route path="/logout" component={Logout} />
              <Route path="/login" component={NotAuthedLogin} />
              <Route path="/register" component={NotAuthedRegsiter} />
              <Route path="/registration-success" component={SuccessRegistration} />
              <Route path="/login-employee" component={AuthedLoginEmployee} />
              <Route path="/new-restaurant" component={AuthedNewRestaurant} />
              <Route path="/new-employee" component={AuthedCreateEmployee} />
              <Route path="/tables/:name/:id" component={AuthedTablesPage} />
              <Route path="/tables" component={AuthedTablesPage} />
              <Route path="/servers" component={AuthedServers} />
              <Route path="/menu" component={AuthedMenu} />
              <Route
                path="/party/:id"
                render={props => <AuthedPartyPage {...props} modalIsOpen={modalIsOpen} />}
              />
              <Route
                path="/settings"
                render={props => <AuthedSettings {...props} modalIsOpen={modalIsOpen} />}
              />
              <Route path="/help" component={AuthedHelp} />
              <Route path="/404" component={NotFound} exact />
              <Redirect to="/404" />
            </Switch>
          </s.Main>
        </s.Container>
      </StripeProvider>
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
  role: state.auth.role,
  loggedIn: state.auth.jwt
});

export default connect(
  mapStateToProps,
  { setInitialAuth }
)(App);
