import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginEmployee } from '../../redux/actions/auth';

import * as s from './styles';

class LoginEmployee extends React.Component {
  state = { pin: '', pass: '' };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.loginEmployee(this.state, this.props.history.push);
  };

  render() {
    return (
      <s.Container>
        <h1>I login employees when the restaurant service is logged in.</h1>
        <s.Form onSubmit={this.handleSubmit}>
          <input
            placeholder="pin"
            type="text"
            onChange={this.handleChange}
            name="pin"
            minLength="4"
            maxLength="4"
            autoComplete="username"
            value={this.state.pin}
          />
          <input
            placeholder="password"
            type="password"
            onChange={this.handleChange}
            name="pass"
            minLength="8"
            maxLength="21"
            autoComplete="current-password"
            value={this.state.pass}
          />
          <button type="submit">Submit</button>
        </s.Form>
      </s.Container>
    );
  }
}

LoginEmployee.propTypes = {
  loginEmployee: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.any),
};

LoginEmployee.defaultProps = {
  loginEmployee: () => {},
  history: {}
};


export default connect(
  null,
  { loginEmployee }
)(LoginEmployee);
