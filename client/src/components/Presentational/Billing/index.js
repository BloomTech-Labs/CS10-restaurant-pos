import React from 'react';
// import StripeCheckout from 'react-stripe-checkout';
import PropTypes from 'prop-types';

import { Button } from '../../../global-styles/styledComponents';

import * as s from './styles';

class Billing extends React.Component {
  openModal = () => {
    this.props.openModal();
  };

  render() {
    const { membership, unsubscribe, openModal } = this.props;
    return (
      <s.Container membership={membership}>
        {membership ? (
          <Button dark type="button" onClick={unsubscribe}>
            Unsubscribe
          </Button>
        ) : (
          <div>
            <Button dark primary type="submit" onClick={openModal}>
              Subscribe
            </Button>
          </div>
        )}
      </s.Container>
    );
  }
}

Billing.propTypes = {
  membership: PropTypes.bool,
  openModal: PropTypes.func,
  unsubscribe: PropTypes.func
};

Billing.defaultProps = {
  membership: false,
  openModal: () => {},
  unsubscribe: () => {}
};

export default Billing;
