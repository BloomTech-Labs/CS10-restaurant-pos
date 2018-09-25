import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Elements } from 'react-stripe-elements';

import Modal from '../HOC/Modal';
import StripeCheckoutForm from '../StripeCheckoutForm';
import OrderTotal from '../OrderTotal';
import TablesPageTitle from '../TablesPageTitle';
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
    // this.props.checkoutSplitOrder
  };

  render() {
    return (
      <React.Fragment>
        <Modal isOpen={this.props.modalIsOpen}>
          <s.Title>
            <TablesPageTitle tables={this.props.tables} />
            <div>Server Name</div>
          </s.Title>
          <s.Order>
            {this.props.order.map(item => (
              <div key={shortid.generate()}>
                {item.name} : {item.localRef}
                <div onClick={() => this.props.toggleSplitCheckItem(item)}>+</div>
              </div>
            ))}
          </s.Order>
          <s.Checkout>
            <OrderTotal
              subTotal={this.props.subTotal}
              location={this.props.location}
              setTotal={this.props.setTotal}
            />
          </s.Checkout>
          <s.OrderButtons>
            {this.state.showStripe ? (
              <Elements>
                <StripeCheckoutForm
                  sendPayment={this.props.sendPayment}
                  total={this.props.order.reduce((acc, item) => acc + item.price, 0)}
                />
              </Elements>
            ) : (
              <React.Fragment>
                <Button
                  inactive={!this.props.splitOrder.length}
                  dark
                  type="button"
                  onClick={this.props.splitOrder.length ? this.props.openSplitModal : undefined}
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
        <Modal
          closeSplitModal={this.props.closeSplitModal}
          isSplitOpen={this.props.splitModalIsOpen}
        >
          {this.props.splitOrder.map(item => (
            <div key={shortid.generate()}>
              {item.name} : {item.localRef}
            </div>
          ))}

          {this.state.showStripe ? (
            <Elements>
              <StripeCheckoutForm
                sendPayment={this.props.sendPayment}
                total={this.props.splitOrder.reduce((acc, item) => acc + item.price, 0)}
                isSplit
              />
            </Elements>
          ) : (
            <React.Fragment>
              <Button dark type="button" onClick={this.props.closeSplitModal}>
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
  order: [],
  splitOrder: [],
  tables: [{ number: 4 }],
  location: { country: 'US', state: 'CA' }
};

export default CheckoutModal;
