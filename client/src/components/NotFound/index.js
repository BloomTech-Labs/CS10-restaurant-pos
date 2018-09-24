import React, { Component } from 'react';

import { Button } from '../../global-styles/styledComponents';

import * as s from './styles';

class NotFound extends Component {
  render() {
    return (
      <div>
        404
        <s.Test>
          Test text
          <Button>Edit</Button>
          <Button primary>Save</Button>
          <div style={{ background: '#303B49' }}>
            <Button dark>Checkout</Button>
            <Button primary dark>Save</Button>
          </div>
        </s.Test>
      </div>
    );
  }
}

export default NotFound;
