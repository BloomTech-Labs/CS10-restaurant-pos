import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

import { Button } from '../../global-styles/styledComponents';

import * as s from './styles';

const createOptions = () => ({
  style: {
    base: {
      fontSize: '17px',
      color: 'white',
      fontFamily: 'Source Code Pro, monospace',
      '::placeholder': {
        color: 'grey'
      }
    },
    invalid: {
      color: '#9e2146'
    }
  }
});

class StripeCheckoutForm extends React.Component {
  handleSubmit = (event) => {
    const amount = Math.trunc(this.props.total * 100);
    event.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createToken()
        .then((token) => {
          this.props.sendPayment(
            token,
            amount,
            'sneaky_snake_case',
            this.props.isSplit,
            this.props.partyId,
          );
        })
        .catch((error) => console.error(error));
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <s.Form onSubmit={this.handleSubmit}>
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
        <Button dark onClick={this.handleSubmit}>
          Pay
        </Button>
      </s.Form>
    );
  }
}

export default injectStripe(StripeCheckoutForm);
