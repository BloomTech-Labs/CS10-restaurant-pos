import React from 'react';
import salesTax from 'sales-tax';
import PropTypes from 'prop-types';

import * as s from './styles';

class OrderTotal extends React.Component {
  state = {
    tax: 0,
    total: 0
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.updateTaxes();
    }
  }

  componentWillUnmount() {
    console.log('fucking umounted', this.state);
  }

  updateTaxes = () => {
    const { location, subTotal } = this.props;
    salesTax
      .getAmountWithSalesTax(location.country, location.state, subTotal)
      .then((price) => {
        this.setState(
          {
            tax: price.total - price.price,
            total: price.total
          },
          () => {
            this.props.setTotal(this.state.total);
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
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
          <div>{this.props.subTotal.toFixed(2)}</div>
          <div>{this.state.tax.toFixed(2)}</div>
          <div>{this.state.total.toFixed(2)}</div>
        </s.Amount>
      </s.Display>
    );
  }
}

const locationType = PropTypes.shape({
  country: PropTypes.string,
  state: PropTypes.string
});

OrderTotal.propTypes = {
  location: locationType,
  subTotal: PropTypes.number,
  setTotal: PropTypes.func
};

OrderTotal.defaultProps = {
  subTotal: 0,
  location: { country: 'US', state: 'CA' },
  setTotal: () => {}
};

export default OrderTotal;
