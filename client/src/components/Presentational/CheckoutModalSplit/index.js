import React from 'react';
import PropTypes from 'prop-types';
import { Elements } from 'react-stripe-elements';

import Modal from '../../HOC/Modal';
import StripeCheckoutForm from '../../StripeCheckoutForm';
import OrderList from '../OrderList';
import { Button } from '../../../global-styles/styledComponents';

// TODO: To use or not to use
// import * as s from './styles';

export default function CheckoutModalSplit(props) {
  const {
    sendPayment,
    partyId,
    splitOrder,
    closeSplitModal,
    splitModalIsOpen,
    showStripe,
    checkoutSplitOrder
  } = props;

  return (
    <Modal closeSplitModal={closeSplitModal} isSplitOpen={splitModalIsOpen}>
      <OrderList order={splitOrder} />
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
    </Modal>
  );
}

CheckoutModalSplit.propTypes = {
  closeSplitModal: PropTypes.func,
  sendPayment: PropTypes.func,
  splitModalIsOpen: PropTypes.bool,
  partyId: PropTypes.string,
  splitOrder: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  showStripe: PropTypes.bool,
  checkoutSplitOrder: PropTypes.func
};

CheckoutModalSplit.defaultProps = {
  closeSplitModal: () => {},
  sendPayment: () => {},
  splitModalIsOpen: false,
  partyId: 'defaultpartyid',
  splitOrder: [],
  showStripe: false,
  checkoutSplitOrder: () => {}
};
