import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Elements } from 'react-stripe-elements';

import Modal from '../HOC/Modal';
import StripeCheckoutForm from '../StripeCheckoutForm';
import OrderTotal from '../OrderTotal';
import { Button } from '../../global-styles/styledComponents';

import * as s from './styles';

class CheckoutModal extends React.Component {
  state = {
    showStripe: false,
  }

  toggleCheckout = () => {
    this.setState(prev => ({
      showStripe: !prev.showStripe,
    }));
  }

  render() {
    return (
      <React.Fragment>
        {this.props.modalIsOpen && (
          <Modal>
            <s.Order>
              {this.props.order.map(item => (
                <div key={shortid.generate()}>
                  {item.name} : {item.localRef}
                  <div onClick={() => this.props.toggleSplitCheckItem(item)}>+</div>
                </div>
              ))}
            </s.Order>
            <s.Title>
              <h2>Checkout Modal</h2>
              <div>Server Name</div>
            </s.Title>
            <div>
              <OrderTotal
                subTotal={this.props.subTotal}
                location={this.props.location}
                setTotal={this.props.setTotal}
              />
            </div>
            <s.OrderButtons>
              {this.state.showStripe ? (
                <Elements>
                  <StripeCheckoutForm />
                </Elements>
              ) : (
                <React.Fragment>
                  <Button inactive dark type="button" onClick={this.props.openSplitModal}>
                    Split Check
                  </Button>
                  <Button dark primary type="button" onClick={this.toggleCheckout}>
                    Checkout
                  </Button>
                </React.Fragment>
              )}
            </s.OrderButtons>
          </Modal>
        )}
        {this.props.splitModalIsOpen && (
          <Modal closeSplitModal={this.props.closeSplitModal}>
            {this.props.splitOrder.map(item => (
              <div key={shortid.generate()}>{item.name} : {item.localRef}</div>
            ))}
            <div>Split Modal</div>
            <Button dark type="button" onClick={this.props.closeSplitModal}>
              Cancel
            </Button>
            <Button dark primary type="button">
              Checkout
            </Button>
          </Modal>
        )}
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
  subTotal: PropTypes.number,
  modalIsOpen: PropTypes.bool,
  splitModalIsOpen: PropTypes.bool,
  order: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  splitOrder: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
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
  history: { push: () => {} },
  subTotal: 0,
  modalIsOpen: false,
  splitModalIsOpen: false,
  order: [],
  splitOrder: [],
  location: { country: 'US', state: 'CA' }
};

export default CheckoutModal;
