import React from 'react';
// import StripeCheckout from 'react-stripe-checkout';
import PropTypes from 'prop-types';

import { Button } from '../../../global-styles/styledComponents';

import * as s from './styles';

class Billing extends React.Component {
  state = {
    // TODO: Clean all this up
    // firstName: '',
    // lastName: '',
    // email: ''
    // cc: '',
    // expiry: '',
    // cvv: ''
  };

  openModal = () => {
    this.props.openModal();
  };

  // TODO: Clean all this up
  // handleChange = (event) => {
  //   this.setState({ [event.target.name]: event.target.value });
  // };

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   // this.props.addRestaurant(this.state);
  // };

  // subscribe = (token) => {
  //   this.props.subscribe(token);
  // };

  render() {
    const { membership, unsubscribe, openModal } = this.props;
    return (
      <s.Container>
        {/* // TODO: add support for multiple subscription term options */}
        {membership ? (
          <Button dark type="button" onClick={unsubscribe}>
            Unsubscribe
          </Button>
        ) : (
        // TODO: Clean all this up
          /* <StripeCheckout
              name="POS Checkout"
              description="Subscribe"
              ComponentClass="div"
              currency="USD"
              stripeKey="pk_test_0axArT8SI2u6aiUnuQH2lJzg"
              image="https://beej.us/images/beejthumb.gif"
              token={this.subscribe}
              allowRememberMe={false}
            >
              <Button primary type="button">
                Subscribe
              </Button>
            </StripeCheckout> */
          <div>
            <Button type="submit" onClick={openModal}>
              Subscribe
            </Button>
          </div>
        )}
      </s.Container>
    );
  }
}

// TODO: Clean all this up
Billing.propTypes = {
  membership: PropTypes.bool,
  openModal: PropTypes.func,
  // subscribe: PropTypes.func,
  unsubscribe: PropTypes.func
};

Billing.defaultProps = {
  membership: false,
  openModal: () => {},
  // subscribe: () => {},
  unsubscribe: () => {}
};

export default Billing;
