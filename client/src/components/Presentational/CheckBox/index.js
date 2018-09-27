import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

class CheckBox extends React.Component {
  toggleCheck = () => {
    this.props.action(this.props.item);
  };

  render() {
    const { checked } = this.props;
    return (
      <s.CheckBox
        type="checkbox"
        id="check"
        onClick={this.toggleCheck}
        checked={checked}
        readOnly
      />
    );
  }
}

CheckBox.propTypes = {
  action: PropTypes.func,
  item: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  checked: PropTypes.bool
};

CheckBox.defaultProps = {
  action: () => {},
  item: {},
  checked: false
};

export default CheckBox;
