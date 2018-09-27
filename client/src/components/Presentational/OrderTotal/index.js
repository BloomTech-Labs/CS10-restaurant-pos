import React from 'react';
import salesTax from 'sales-tax';
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
    this.setState({
      subTotal: this.props.order.reduce((acc, foodItem) => acc + foodItem.price, 0),
    }, () => {
      this.updateTaxes();
    });
  }

  updateTaxes = () => {
    const { location } = this.props;
    salesTax
      .getAmountWithSalesTax(location.country, location.state, this.state.subTotal)
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
          <div>{this.state.subTotal.toFixed(2)}</div>
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
  order: PropTypes.arrayOf(PropTypes.object),
  setTotal: PropTypes.func
};

OrderTotal.defaultProps = {
  order: [{}],
  location: { country: 'US', state: 'CA' },
  setTotal: () => {}
};

export default OrderTotal;
