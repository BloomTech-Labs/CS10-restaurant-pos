import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Elements } from 'react-stripe-elements';

import Modal from '../HOC/Modal';
import StripeCheckoutForm from '../StripeCheckoutForm';
import OrderTotal from '../Presentational/OrderTotal';
import OrderList from '../Presentational/OrderList';
import CheckBox from '../Presentational/CheckBox';
import PartyTablesTitle from '../Presentational/PartyTablesTitle';
import { Button } from '../../global-styles/styledComponents';

import * as s from './styles';

class CheckoutModal extends React.Component {
  state = {
    showStripe: false
  };

  toggleCheckout = () => {
    this.setState(prev => ({
      showStripe: !prev.showStripe
    }));
  };

  checkoutSplitOrder = () => {
    this.toggleCheckout();
  };

  render() {
    const {
      modalIsOpen,
      tables,
      subTotal,
      location,
      setTotal,
      sendPayment,
      partyId,
      order,
      splitOrder,
      openSplitModal,
      closeSplitModal,
      toggleSplitCheckItem,
      splitModalIsOpen
    } = this.props;
    return (
      <React.Fragment>
        <Modal isOpen={modalIsOpen}>
          <s.Title>
            <PartyTablesTitle tables={tables} />
            <div>Server Name</div>
          </s.Title>
          {/* <s.Order>
            {order.map(item => (
              <div key={shortid.generate()}>
                {item.name} : {item.localRef}
                <div onClick={() => toggleSplitCheckItem(item)}>+</div>
              </div>
            ))}
          </s.Order> */}
          <OrderList
            splitOrder={splitOrder}
            order={order}
            ItemButton={CheckBox}
            itemAction={toggleSplitCheckItem}
          />
          <s.Checkout>
            <OrderTotal subTotal={subTotal} location={location} setTotal={setTotal} />
          </s.Checkout>
          <s.OrderButtons>
            {this.state.showStripe ? (
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
                  inactive={!splitOrder.length}
                  dark
                  type="button"
                  onClick={splitOrder.length ? openSplitModal : undefined}
                >
                  Split Check
                </Button>
                <Button dark primary type="button" onClick={this.toggleCheckout}>
                  Checkout
                </Button>
              </React.Fragment>
            )}
          </s.OrderButtons>
        </Modal>
        <Modal closeSplitModal={closeSplitModal} isSplitOpen={splitModalIsOpen}>
          {splitOrder.map(item => (
            <div key={shortid.generate()}>
              {item.name} : {item.localRef}
            </div>
          ))}

          {this.state.showStripe ? (
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
              <Button dark primary type="button" onClick={this.checkoutSplitOrder}>
                Checkout
              </Button>
            </React.Fragment>
          )}
        </Modal>
      </React.Fragment>
    );
  }
}

const locationType = PropTypes.shape({
  country: PropTypes.string,
  state: PropTypes.string
});

CheckoutModal.propTypes = {
  openSplitModal: PropTypes.func,
  setTotal: PropTypes.func,
  toggleSplitCheckItem: PropTypes.func,
  closeSplitModal: PropTypes.func,
  sendPayment: PropTypes.func,
  subTotal: PropTypes.number,
  modalIsOpen: PropTypes.bool,
  splitModalIsOpen: PropTypes.bool,
  partyId: PropTypes.string,
  order: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  splitOrder: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  tables: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  location: locationType,
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

CheckoutModal.defaultProps = {
  openSplitModal: () => {},
  setTotal: () => {},
  toggleSplitCheckItem: () => {},
  closeSplitModal: () => {},
  sendPayment: () => {},
  history: { push: () => {} },
  subTotal: 0,
  modalIsOpen: false,
  splitModalIsOpen: false,
  partyId: 'defaultpartyid',
  order: [],
  splitOrder: [],
  tables: [{ number: 4 }],
  location: { country: 'US', state: 'CA' }
};

export default CheckoutModal;
