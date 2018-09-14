import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

class OrderScratchPad extends React.Component {
  render() {
    return (
      <div>
        {this.props.order.map(item => (
          <div key={shortid.generate()}>
            <span onClick={() => this.props.removeItemFromOrder(item)}>X</span>
            <span>{item.name}</span>
            <span>{item.price}</span>
          </div>
        ))}
      </div>
    );
  }
}

OrderScratchPad.propTypes = {
  order: PropTypes.arrayOf(PropTypes.object), // TODO: define shape later
  removeItemFromOrder: PropTypes.func
};

OrderScratchPad.defaultProps = {
  order: [],
  removeItemFromOrder: () => {}
};
export default OrderScratchPad;
