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

class StripeRegisterForm extends React.Component {
  handleSubmit = (event) => {
    const amount = 100; // TODO: Should we set this number in a config?
    event.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createToken()
        .then((token) => {
          this.props.subscribe(
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
          Subscribe
        </Button>
      </s.Form>
    );
  }
}

export default injectStripe(StripeRegisterForm);
