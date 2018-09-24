import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { subscribe } from '../../redux/actions/payments';
import { Button } from '../../global-styles/styledComponents';

import * as s from './styles';

class Billing extends React.Component {
  state = {
    // firstName: '',
    // lastName: '',
    // email: '',
    // cc: '',
    // expiry: '',
    // cvv: ''
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    // this.props.addRestaurant(this.state);
  };

  saveToken = (token) => {
    this.props.subscribe(token);
  }

  render() {
    return (
      <s.Container>
        Billing
        {/* <s.Form onSubmit={this.handleSubmit}>
          <input
            placeholder="John"
            type="text"
            onChange={this.handleChange}
            name="firstName"
            maxLength="30"
            value={this.state.firstName}
          />
          <input
            placeholder="Smith"
            type="text"
            onChange={this.handleChange}
            name="lastName"
            maxLength="30"
            value={this.state.lastName}
          />
          <input
            placeholder="person@gmail.com"
            type="text"
            onChange={this.handleChange}
            name="email"
            value={this.state.email}
          />
          <input
            placeholder="9999 9999 9999 9999"
            type="text"
            onChange={this.handleChange}
            name="cc"
            value={this.state.cc}
          />
          <input
            placeholder="01/21"
            type="text"
            onChange={this.handleChange}
            name="expiry"
            value={this.state.expiry}
          />
          <input
            placeholder="billing"
            type="text"
            onChange={this.handleChange}
            name="CVV"
            value={this.state.cvv}
          />
          <button type="submit">Submit</button>
        </s.Form> */}
        {/* // TODO: add support for multiple subscription term options */}
        <StripeCheckout
          name="POS Checkout"
          description="Subscribe"
          ComponentClass="div"
          currency="USD"
          stripeKey="pk_test_0axArT8SI2u6aiUnuQH2lJzg"
          image="https://beej.us/images/beejthumb.gif"
          token={this.saveToken}
          allowRememberMe={false}
        >
          <Button primary type="button">
            Subscribe
          </Button>
        </StripeCheckout>
      </s.Container>
    );
  }
}

Billing.propTypes = {
  subscribe: PropTypes.func
};

Billing.defaultProps = {
  subscribe: () => {}
};

export default connect(
  null,
  { subscribe }
)(Billing);
