import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { register } from '../../redux/actions/auth';

import * as s from './styles';

class Register extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    pass: '',
    confirmPass: ''
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.register(this.state, this.props.history.push);
  };

  // TODO: Send out the PIN in an email

  render() {
    return (
      <s.Container>
        <s.Form onSubmit={this.handleSubmit}>
          <input
            placeholder="First Name"
            type="text"
            onChange={this.handleChange}
            name="firstName"
            maxLength="30"
            value={this.state.firstName}
          />
          <input
            placeholder="Last Name"
            type="text"
            onChange={this.handleChange}
            name="lastName"
            maxLength="30"
            value={this.state.lastName}
          />
          <input
            placeholder="email"
            type="email"
            onChange={this.handleChange}
            name="email"
            maxLength="30"
            value={this.state.email}
          />
          <input
            placeholder="password"
            type="password"
            minLength="8"
            maxLength="21"
            onChange={this.handleChange}
            name="pass"
            value={this.state.pass}
          />
          <input
            placeholder="confirm password"
            type="password"
            minLength="8"
            maxLength="21"
            onChange={this.handleChange}
            name="confirmPass"
            value={this.state.confirmPass}
          />
          <button type="submit">Submit</button>
        </s.Form>
      </s.Container>
    );
  }
}

Register.propTypes = {
  register: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

Register.defaultProps = {
  register: () => {},
  history: { push: () => {} }
};

export default connect(
  null,
  { register }
)(Register);
