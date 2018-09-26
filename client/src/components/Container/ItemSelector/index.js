import React from 'react';
import PropTypes from 'prop-types';

import Item from '../../Presentational/Item';

import * as s from './styles';

class ItemSelector extends React.Component {
  addItemToOrder = (item) => {
    this.props.addItemToOrder(item);
  }

  render() {
    return (
      <s.Container>
        {this.props.items.map((item) => (
          <Item key={item._id} addItemToOrder={this.addItemToOrder} item={item} />
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
