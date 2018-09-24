import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

const createOptions = () => ({
  style: {
    base: {
      fontSize: '17px',
      color: '#424770',
      letterSpacing: '0.025em',
      fontFamily: 'Source Code Pro, monospace',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#9e2146'
    }
  }
});

class StripeCheckoutForm extends React.Component {
  handleSubmit = ev => {
    ev.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createToken()
        .then(payload => console.log('[token]', payload))
        .catch(error => console.error(error));
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="card-element">
          Card details
          <CardElement
            id="card-element"
            // onBlur={handleBlur}
            // onChange={handleChange}
            // onFocus={handleFocus}
            // onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <button type="submit">Pay</button>
      </form>
    );
  }
}

export default injectStripe(StripeCheckoutForm);
