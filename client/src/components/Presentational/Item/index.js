import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

class Item extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <s.ItemBoxes key={item._id} onClick={() => this.props.addItemToOrder(item)}>
        <s.ItemTitle>{item.name}</s.ItemTitle>
        <s.ItemDescription>{item.description}</s.ItemDescription>
        <s.ItemPrice>{item.price}</s.ItemPrice>
      </s.ItemBoxes>
    );
  }
}

Item.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number
  }), // TODO: define shape later
  addItemToOrder: PropTypes.func
};

Item.defaultProps = {
  item: {
    name: 'defaultitem',
    description: 'delicious',
    price: '555.00'
  },
  addItemToOrder: () => {}
};

export default Item;
