import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Tables from './Tables';
import Servers from './Servers';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route path="/tables" component={Tables} />
        <Route path="/servers" component={Servers} />
      </React.Fragment>
    );
  }
}

export default App;
