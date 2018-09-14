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

  updateTaxes = () => {
    const { location, subTotal } = this.props;
    salesTax
      .getAmountWithSalesTax(location.country, location.state, subTotal)
      .then(price => {
        this.setState({
          tax: Number((price.total - price.price).toFixed(2)),
          total: Number(price.total.toFixed(2))
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <s.Display>
        <div>{this.props.subTotal}</div>
        <div>
          {this.state.tax}
        </div>
        <div>
          {this.state.total}
        </div>
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
  subTotal: PropTypes.number
};

OrderTotal.defaultProps = {
  subTotal: 0,
  location: { country: 'US', state: 'CA' }
};

export default OrderTotal;
