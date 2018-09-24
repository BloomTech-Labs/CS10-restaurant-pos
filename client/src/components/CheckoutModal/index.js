import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import StripeCheckout from 'react-stripe-checkout';

import Modal from '../HOC/Modal';
import OrderTotal from '../OrderTotal';
import { Button } from '../../global-styles/styledComponents';

import * as s from './styles';

class CheckoutModal extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.modalIsOpen && (
          <Modal>
            {this.props.order.map(item => (
              <div key={shortid.generate()}>
                {item.name}
                <div onClick={() => this.props.addToSplitCheck(item)}>+</div>
              </div>
            ))}
            <s.Title>
              <h2>Checkout Modal</h2>
              <div>Server Name</div>
            </s.Title>
            <s.Order>your order and shit</s.Order>
            <div>
              <OrderTotal
                subTotal={this.props.subTotal}
                location={this.props.location}
                setTotal={this.props.setTotal}
              />
            </div>
            <s.OrderButtons>
              <Button dark type="button" onClick={this.props.openSplitModal}>
                Split Check
              </Button>
              {/* TODO: break stripe pub key into env variable */}
              <StripeCheckout
                name="POS Checkout"
                description="subtitle"
                ComponentClass="div"
                currency="USD"
                email="test@test.com"
                stripeKey="pk_test_0axArT8SI2u6aiUnuQH2lJzg"
                image="https://beej.us/images/beejthumb.gif"
                token={this.props.saveToken}
                allowRememberMe={false}
                amount={this.props.subTotal * 100}
              >
                <Button dark primary type="button">
                  Checkout
                </Button>
              </StripeCheckout>
            </s.OrderButtons>
          </Modal>
        )}
        {this.props.splitModalIsOpen && (
          <Modal closeSplitModal={this.props.closeSplitModal}>
            {this.props.splitOrder.map(item => (
              <div key={shortid.generate()}>{item.name}</div>
            ))}
            <div>Split Modal</div>
            <Button dark type="button">
              split modal button one
            </Button>
            <Button dark primary type="button">
              split modal button two
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
  addToSplitCheck: PropTypes.func,
  closeSplitModal: PropTypes.func,
  saveToken: PropTypes.func,
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
  addToSplitCheck: () => {},
  closeSplitModal: () => {},
  saveToken: () => {},
  history: { push: () => {} },
  subTotal: 0,
  modalIsOpen: false,
  splitModalIsOpen: false,
  order: [],
  splitOrder: [],
  location: { country: 'US', state: 'CA' }
};

export default CheckoutModal;
