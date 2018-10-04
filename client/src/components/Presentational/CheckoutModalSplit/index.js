import React from 'react';
import PropTypes from 'prop-types';
import { Elements } from 'react-stripe-elements';

import Modal from '../../HOC/Modal';
import StripeCheckoutForm from '../../StripeCheckoutForm';
import OrderTotal from '../OrderTotal';
import OrderList from '../OrderList';
import { Button } from '../../../global-styles/styledComponents';

import * as s from './styles';

export default function CheckoutModalSplit(props) {
  const {
    sendPayment,
    partyId,
    splitOrder,
    closeSplitModal,
    splitModalIsOpen,
    showStripe,
    checkoutSplitOrder,
    location
  } = props;

  return (
    <Modal closeSplitModal={closeSplitModal} isSplitOpen={splitModalIsOpen}>
      <OrderList order={splitOrder} />
      <s.Checkout>
        <OrderTotal order={splitOrder} location={location} />
      </s.Checkout>
      <s.OrderButtons>
        {showStripe ? (
          <Elements>
            <StripeCheckoutForm
              sendPayment={sendPayment}
              total={splitOrder.reduce((acc, item) => acc + item.price, 0)}
              isSplit
              partyId={partyId}
            />
          </Elements>
        ) : (
          <React.Fragment>
            <Button dark type="button" onClick={closeSplitModal}>
              Cancel
            </Button>
            <Button dark primary type="button" onClick={checkoutSplitOrder}>
              Checkout
            </Button>
          </React.Fragment>
        )}
      </s.OrderButtons>
    </Modal>
  );
}

const locationType = PropTypes.shape({
  country: PropTypes.string,
  state: PropTypes.string
});

CheckoutModalSplit.propTypes = {
  closeSplitModal: PropTypes.func,
  sendPayment: PropTypes.func,
  splitModalIsOpen: PropTypes.bool,
  partyId: PropTypes.string,
  location: locationType,
  splitOrder: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  showStripe: PropTypes.bool,
  checkoutSplitOrder: PropTypes.func
};

CheckoutModalSplit.defaultProps = {
  closeSplitModal: () => {},
  sendPayment: () => {},
  splitModalIsOpen: false,
  partyId: 'defaultpartyid',
  location: { country: 'US', state: 'CA' },
  splitOrder: [],
  showStripe: false,
  checkoutSplitOrder: () => {}
};
