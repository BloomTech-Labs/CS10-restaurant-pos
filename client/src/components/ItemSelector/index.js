import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

class ItemSelector extends React.Component {
  render() {
    return (
      <s.Container>
        {this.props.items.map((item) => (
          <s.ItemBoxes key={item._id} onClick={() => this.props.addItemToOrder(item)}>
            <s.ItemTitle>{item.name}</s.ItemTitle>
            <s.ItemDescription>{item.description}</s.ItemDescription>
            <s.ItemPrice>{item.price}</s.ItemPrice>
          </s.ItemBoxes>
        ))}
      </s.Container>
    );
  }
}

ItemSelector.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object), // TODO: define shape later
  addItemToOrder: PropTypes.func
};

ItemSelector.defaultProps = {
  items: [],
  addItemToOrder: () => {}
};

export default ItemSelector;
