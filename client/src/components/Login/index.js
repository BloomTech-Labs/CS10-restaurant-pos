import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { employeeLogin } from '../../redux/actions/auth';

import * as s from './styles';

class Login extends React.Component {
  state = { pin: '', pass: '' };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.employeeLogin(this.state, this.props.history.push);
  };

  render() {
    return (
      <s.Container>
        <Link to="/register">Don&apos;t have an account? Register here</Link>
        <s.Form onSubmit={this.handleSubmit}>
          <input
            placeholder="pin"
            type="text"
            onChange={this.handleChange}
            name="pin"
            minLength="6"
            maxLength="6"
            autoComplete="username"
            value={this.state.pin}
          />
          <input
            placeholder="password"
            type="password"
            onChange={this.handleChange}
            name="pass"
            minLength="8"
            maxLength="30"
            autoComplete="current-password"
            value={this.state.pass}
          />
          <button type="submit">Submit</button>
        </s.Form>
      </s.Container>
    );
  }
}

Login.propTypes = {
  employeeLogin: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.any),
};

Login.defaultProps = {
  employeeLogin: () => {},
  history: {}
};


export default connect(
  null,
  { employeeLogin }
)(Login);
