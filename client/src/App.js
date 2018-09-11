import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Landing from './Landing';

// ---------------------------------------------------
import serverURI from './config/URI';

// Axios Defaults
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] =
  'Bearer ' + localStorage.getItem('jwt');

class App extends Component {
  componentDidMount() {
    console.log('serverURI in cdm', serverURI);
    axios
      .post(`${serverURI}/api`, { message: 'Sent' })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // ---------------------------------------------------

  render() {
    return (
      <React.Fragment>
        <Route path="/" component={Landing} />
      </React.Fragment>
    );
  }
}

export default App;
