import React from 'react';
import PropTypes from 'prop-types';
import { Elements } from 'react-stripe-elements';

import Modal from '../../HOC/Modal';
import StripeCheckoutForm from '../../StripeCheckoutForm';
import OrderTotal from '../OrderTotal';
import OrderList from '../OrderList';
import CheckBox from '../CheckBox';
import PartyTablesTitle from '../PartyTablesTitle';
import { Button } from '../../../global-styles/styledComponents';

import * as s from './styles';

export default function CheckoutModalMain(props) {
  const {
    modalIsOpen,
    tables,
    taxRate,
    setTotal,
    sendPayment,
    partyId,
    order,
    splitOrder,
    openSplitModal,
    toggleSplitCheckItem,
    toggleCheckout,
    showStripe,
    server
  } = props;

  console.log('in checkout modal main, order and splitOrder:', order, splitOrder);

  return (
    <Modal isOpen={modalIsOpen}>
      <s.Title>
        <PartyTablesTitle tables={tables} />
        <div>{server}</div>
      </s.Title>
      <OrderList
        splitOrder={splitOrder}
        order={order}
        ItemButton={CheckBox}
        itemAction={toggleSplitCheckItem}
      />
      <s.Checkout>
        <OrderTotal order={order} taxRate={taxRate} setTotal={setTotal} />
      </s.Checkout>
      <s.OrderButtons>
        {showStripe ? (
          <Elements>
            <StripeCheckoutForm
              sendPayment={sendPayment}
              total={order.reduce((acc, item) => acc + item.price, 0)}
              isSplit={false}
              partyId={partyId}
            />
          </Elements>
        ) : (
          <React.Fragment>
            <Button
              inactive={!splitOrder.length || splitOrder.length === order.length}
              dark
              type="button"
              onClick={(splitOrder.length && splitOrder.length < order.length)
                ? openSplitModal
                : undefined}
            >
              Split Check
            </Button>
            <Button dark primary type="button" onClick={toggleCheckout}>
              Checkout
            </Button>
          </React.Fragment>
        )}
      </s.OrderButtons>
    </Modal>
  );
}

CheckoutModalMain.propTypes = {
  openSplitModal: PropTypes.func,
  setTotal: PropTypes.func,
  toggleSplitCheckItem: PropTypes.func,
  sendPayment: PropTypes.func,
  modalIsOpen: PropTypes.bool,
  partyId: PropTypes.string,
  order: PropTypes.arrayOf(PropTypes.object),
  splitOrder: PropTypes.arrayOf(PropTypes.object),
  tables: PropTypes.arrayOf(PropTypes.object),
  taxRate: PropTypes.number,
  toggleCheckout: PropTypes.func,
  showStripe: PropTypes.bool,
  server: PropTypes.string
};

CheckoutModalMain.defaultProps = {
  openSplitModal: () => {},
  setTotal: () => {},
  toggleSplitCheckItem: () => {},
  sendPayment: () => {},
  modalIsOpen: false,
  partyId: 'defaultpartyid',
  order: [{}],
  splitOrder: [{}],
  tables: [{}],
  taxRate: 0,
  toggleCheckout: () => {},
  showStripe: false,
  server: 'Server Name'
};
