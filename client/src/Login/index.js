import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../redux/actions/auth';

class Login extends React.Component {
  state = { pin: '', pass: '' };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.login(this.state, this.props.history.push);
  };

  render() {
    return (
      <div>
        <Link to="/register">Don't have an account? Register here</Link>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="pin"
            type="text"
            onChange={this.handleChange}
            name="pin"
            value={this.state.pin}
          />
          <input
            placeholder="password"
            type="password"
            minLength="8"
            onChange={this.handleChange}
            name="pass"
            value={this.state.pass}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}


export default connect(
  null,
  { login }
)(Login);
