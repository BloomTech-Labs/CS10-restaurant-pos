import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import OrderTotal from '../OrderTotal';

import * as s from './styles';

class OrderScratchPad extends React.Component {
  render() {
    return (
      <s.Container>
        <s.Scroll>
          {this.props.order.map((item) => (
            <s.Items key={shortid.generate()}>
              <s.DeleteButton onClick={() => this.props.removeItemFromOrder(item)}>
                X
              </s.DeleteButton>
              <span>{item.name}</span>
              <span>{item.price}</span>
            </s.Items>
          ))}
        </s.Scroll>
        <OrderTotal location={this.props.location} subTotal={this.props.subTotal} />
        <button type="button" onClick={this.props.saveParty}>Save</button>
        <button type="button" onClick={this.props.openModal}>
          Checkout Now
        </button>
      </s.Container>
    );
  }
}

const locationType = PropTypes.shape({
  country: PropTypes.string,
  state: PropTypes.string
});

OrderScratchPad.propTypes = {
  order: PropTypes.arrayOf(PropTypes.object), // TODO: define shape later
  removeItemFromOrder: PropTypes.func,
  location: locationType,
  subTotal: PropTypes.number,
  openModal: PropTypes.func,
  saveParty: PropTypes.func
};

OrderScratchPad.defaultProps = {
  order: [],
  subTotal: 0,
  location: { country: 'US', state: 'CA' },
  removeItemFromOrder: () => {},
  openModal: () => {},
  saveParty: () => {}
};

export default OrderScratchPad;
