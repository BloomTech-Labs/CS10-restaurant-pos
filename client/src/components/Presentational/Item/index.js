import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

export default function Item(props) {
  const { item } = props;
  const imageToDisplay = item.images
    ? item.images.medium
    : 'https://minimalistbaker.com/wp-content/uploads/2016/05/AMAZING-EASY-Quinoa-Taco-22Meat22-thats-crispy-flavorful-and-protein-packed-9-ingredients-SO-EASY-healthy-vegan-glutenfree-quinoa-tacos-mexican-recipe-768x1128.jpg';
  return (
    <s.ItemBoxes key={item._id} onClick={() => props.addItemToOrder(item)}>
      <s.ItemPic>
        <img src={imageToDisplay} alt="menu item" />
      </s.ItemPic>
      <s.ItemTitle>{item.name}</s.ItemTitle>
      <s.ItemDescription>{item.description}</s.ItemDescription>
      <s.ItemPrice>{item.price}</s.ItemPrice>
    </s.ItemBoxes>
  );
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
