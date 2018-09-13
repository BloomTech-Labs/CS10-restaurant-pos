import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { register } from '../../redux/actions/auth';

class Register extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    pin: '',
    pass: '',
    confirmPass: '',
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.register(this.state);
  };

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
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
              placeholder="pin"
              type="text"
              onChange={this.handleChange}
              name="pin"
              minLength="6"
              maxLength="6"
              value={this.state.pin}
            />
            <input
              placeholder="password"
              type="password"
              minLength="8"
              maxLength="30"
              onChange={this.handleChange}
              name="pass"
              value={this.state.pass}
            />
            <input
              placeholder="confirm password"
              type="password"
              minLength="8"
              maxLength="30"
              onChange={this.handleChange}
              name="confirmPass"
              value={this.state.confirmPass}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  register: PropTypes.func,
};

Register.defaultProps = {
  register: () => {},
};

export default connect(
  null,
  { register }
)(Register);
