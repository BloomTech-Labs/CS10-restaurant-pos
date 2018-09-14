import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

class ItemSelector extends React.Component {
  render() {
    return (
      <s.Container>
        {this.props.items.map(item => (
          <s.Boxes key={item._id} onClick={() => this.props.addItemToOrder(item)}>
            <s.Items>{item.name}</s.Items>
            <s.Items>{item.description}</s.Items>
          </s.Boxes>
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
