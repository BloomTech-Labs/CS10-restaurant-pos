import React from 'react';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Landing</h1>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/test">TEST PAGE</Link>
      </div>
    );
  }
}

export default Landing;
