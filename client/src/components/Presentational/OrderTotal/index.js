import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

class OrderTotal extends React.Component {
  state = {
    tax: 0,
    subTotal: 0,
    total: 0
  };

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.order.length !== this.props.order.length) {
      this.initialize();
    }
  }

  initialize = () => {
    this.setState(
      {
        subTotal: this.props.order.reduce((acc, foodItem) => acc + foodItem.price, 0)
      },
      () => {
        this.updateTaxes();
      }
    );
  };

  updateTaxes = () => {
    const { taxRate } = this.props;
    console.log(taxRate);
    this.setState(
      prev => ({
        tax: prev.subTotal * taxRate,
        total: prev.subTotal + (prev.subTotal * taxRate)
      }),
      () => {
        this.props.setTotal(this.state.total);
      }
    );
  };

  render() {
    return (
      <s.Display>
        <s.Label>
          <div>Subtotal</div>
          <div>Tax</div>
          <div>Total</div>
        </s.Label>
        <s.Amount>
          <div>{this.state.subTotal.toFixed(2)}</div>
          <div>{this.state.tax.toFixed(2)}</div>
          <div>{this.state.total.toFixed(2)}</div>
        </s.Amount>
      </s.Display>
    );
  }
}

OrderTotal.propTypes = {
  order: PropTypes.arrayOf(PropTypes.object),
  taxRate: PropTypes.number,
  setTotal: PropTypes.func
};

OrderTotal.defaultProps = {
  order: [{}],
  taxRate: 0,
  setTotal: () => {}
};

export default OrderTotal;
