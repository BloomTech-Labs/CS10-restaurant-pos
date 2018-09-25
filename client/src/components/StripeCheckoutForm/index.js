import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

import { Button } from '../../global-styles/styledComponents';

import * as s from './styles';

const createOptions = () => ({
  style: {
    base: {
      fontSize: '17px',
      color: 'white',
      letterSpacing: '0.025em',
      fontFamily: 'Source Code Pro, monospace',
      '::placeholder': {
        color: 'grey'
      },
    },
    invalid: {
      color: '#9e2146'
    }
  }
});

class StripeCheckoutForm extends React.Component {
  handleSubmit = event => {
    console.warn('wahhahaht');
    event.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createToken()
        .then(token => {
          console.warn('token', token);
          this.props.sendPayment(token, this.props.total * 100, 'PAYMENT_DESCRIPTION_INTERESTING_AND_PROFESSIONAL');
        })
        .catch(error => console.error(error));
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <s.Label htmlFor="card-element">
          Card details
          <CardElement
            id="card-element"
            // onBlur={handleBlur}
            // onChange={handleChange}
            // onFocus={handleFocus}
            // onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </s.Label>
        <Button dark primary type="submit">Pay</Button>
      </form>
    );
  }
}

export default injectStripe(StripeCheckoutForm);
