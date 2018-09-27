import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

export default function DeleteButton(props) {
  return (
    <s.DeleteButton onClick={() => props.action(props.item)}>X</s.DeleteButton>
  );
}

DeleteButton.propTypes = {
  action: PropTypes.func,
  item: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

DeleteButton.defaultProps = {
  action: () => {},
  item: {},
};
