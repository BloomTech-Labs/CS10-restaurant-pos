import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

class ChangePassword extends React.Component {
  state = {
    pin: '',
    oldPassword: '',
    newPassword: '',
    confirmNew: '',
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.changePassword(this.state);
  };

  render() {
    return (
      <s.Container>
        Change Password
        <s.Form onSubmit={this.handleSubmit}>
          <input
            placeholder="pin"
            type="text"
            onChange={this.handleChange}
            name="pin"
            maxLength="30"
            value={this.state.pin}
          />
          <input
            placeholder="Old Password"
            type="password"
            onChange={this.handleChange}
            name="oldPassword"
            maxLength="30"
            value={this.state.oldPassword}
          />
          <input
            placeholder="New Password"
            type="password"
            onChange={this.handleChange}
            name="newPassword"
            maxLength="30"
            value={this.state.newPassword}
          />
          <input
            placeholder="Confirm password"
            type="password"
            minLength="8"
            maxLength="30" // TODO: Look into max pass length
            onChange={this.handleChange}
            name="confirmNew"
            value={this.state.confirmNew}
          />
          <button type="submit">Submit</button>
        </s.Form>
      </s.Container>
    );
  }
}

ChangePassword.propTypes = {
  changePassword: PropTypes.func,
};

ChangePassword.defaultProps = {
  changePassword: () => {},
};

export default ChangePassword;
