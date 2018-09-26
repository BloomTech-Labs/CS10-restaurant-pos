import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

export default function OrderItem(props) {
  const { item } = props;
  return (
    <s.Items>
      <s.DeleteButton onClick={() => props.removeItemFromOrder(item)}>X</s.DeleteButton>
      <span>{item.name}</span>
      <span>{item.price}</span>
    </s.Items>
  );
}

OrderItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number
  }), // TODO: define shape later
  removeItemFromOrder: PropTypes.func
};

OrderItem.defaultProps = {
  item: {
    name: 'defaultitem',
    price: '555.00'
  },
  removeItemFromOrder: () => {}
};
