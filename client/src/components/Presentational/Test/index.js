import React from 'react';
import { ChromePicker } from 'react-color';

import { Button } from '../../../global-styles/styledComponents';

import * as s from './styles';

class Test extends React.Component {
  state = {
    revealed: false,
    background: '#fff'
  };

  toggleColorPicker = () => {
    this.setState((prev) => ({
      revealed: !prev.revealed
    }));
  };

  handleChangeComplete = (color) => {
    localStorage.setItem('themeColor', color.hex);
  };

  render() {
    const { revealed, background } = this.state;
    return (
      <s.Container>
        <Button type="button" onClick={this.toggleColorPicker}>
          {revealed ? 'Save Color' : 'Pick Color'}
        </Button>
        {revealed ? (
          <ChromePicker color={background} onChangeComplete={this.handleChangeComplete} />
        ) : null}
      </s.Container>
    );
  }
}

export default Test;
