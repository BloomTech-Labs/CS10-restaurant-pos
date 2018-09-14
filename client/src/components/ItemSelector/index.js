import React from 'react';
import PropTypes from 'prop-types';

class ItemSelector extends React.Component {
  render() {
    return (
      <div>
        {this.props.items.map(item => (
          <div key={item._id} onClick={() => this.props.addItemToOrder(item)}>
            <div>{item.name}</div>
            <div>{item.description}</div>
          </div>
        ))}
      </div>
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
