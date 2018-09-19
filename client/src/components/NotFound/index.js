import React, { Component } from 'react';

import * as s from './styles';

class NotFound extends Component {
  render() {
    return (
      <div>
        404
        <s.Test>
          Test text
          <s.Bg>
            <s.Button>Here is a Test Button</s.Button>
            <s.Button main>Here is a Test Button</s.Button>
          </s.Bg>
        </s.Test>
      </div>
    );
  }
}

export default NotFound;
