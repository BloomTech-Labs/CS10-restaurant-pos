import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

class LoginEmployee extends React.Component {
  state = { pin: '', pass: '' };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.loginEmployee(this.state);
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
};

LoginEmployee.defaultProps = {
  loginEmployee: () => {},
};


export default LoginEmployee;
