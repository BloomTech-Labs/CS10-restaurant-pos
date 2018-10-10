import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import * as s from './styles';

class CheckBox extends React.Component {
  toggleCheck = () => {
    this.props.action(this.props.item);
  };

  render() {
    const { checked } = this.props;
    const id = shortid.generate();
    return (
      <s.CheckBox>
        <input
          type="checkbox"
          id={id}
          onClick={this.toggleCheck}
          checked={checked}
          readOnly
        />
        <label htmlFor={id} />
      </s.CheckBox>
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
