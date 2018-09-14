import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import * as s from './styles';

class OrderScratchPad extends React.Component {
  render() {
    return (
      <s.Container>
        <s.Scroll>
          {this.props.order.map(item => (
            <s.Items key={shortid.generate()}>
              <s.DeleteButton onClick={() => this.props.removeItemFromOrder(item)}>X</s.DeleteButton>
              <span>{item.name}</span>
              <span>{item.price}</span>
            </s.Items>
          ))}
        </s.Scroll>
        <s.SubTotal>
          <div>
            {this.props.subTotal}
          </div>
        </s.SubTotal>
      </s.Container>
    );
  }
}

OrderScratchPad.propTypes = {
  order: PropTypes.arrayOf(PropTypes.object), // TODO: define shape later
  subTotal: PropTypes.number,
  removeItemFromOrder: PropTypes.func,
};

OrderScratchPad.defaultProps = {
  order: [],
  subTotal: 0,
  removeItemFromOrder: () => {}
};
export default OrderScratchPad;
