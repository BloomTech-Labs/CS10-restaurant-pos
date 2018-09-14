import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import * as s from './styles';

class OrderScratchPad extends React.Component {
  render() {
    return (
      <s.Container>
        {this.props.order.map(item => (
          <s.Boxes key={shortid.generate()}>
            <s.DeleteButton onClick={() => this.props.removeItemFromOrder(item)}>X</s.DeleteButton>
            <span>{item.name}</span>
            <span>{item.price}</span>
          </s.Boxes>
        ))}
      </s.Container>
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
