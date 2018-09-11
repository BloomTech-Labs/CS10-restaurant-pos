import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Landing from './Landing';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route path="/" component={Landing} />
      </React.Fragment>
    );
  }
}

export default App;
