import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import * as s from './styles';

class ChangePassword extends React.Component {
  state = {
    old: '',
    new: '',
    confirmNew: '',
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // this.props.register(this.state);
  };

  render() {
    return (
      <s.Container>
        Change Password
        <s.Form onSubmit={this.handleSubmit}>
          <input
            placeholder="Old Password"
            type="text"
            onChange={this.handleChange}
            name="old"
            maxLength="30"
            value={this.state.old}
          />
          <input
            placeholder="New Password"
            type="text"
            onChange={this.handleChange}
            name="new"
            maxLength="30"
            value={this.state.new}
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

// ChangePassword.propTypes = {
// };

// ChangePassword.defaultProps = {
// };

export default connect(
  null
)(ChangePassword);
