import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

// Axios Defaults
axios.defaults.withCredentials = true;

class App extends Component {
  componentDidMount() {
    axios
      .put('http://localhost:5000/api/1', { message: 'Sent' })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Hello POS</h1>
      </div>
    );
  }
}

export default App;
