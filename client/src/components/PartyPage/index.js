import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom';
import shortid from 'shortid';
import StripeCheckout from 'react-stripe-checkout';

import TablesPageTitle from '../TablesPageTitle';
import ItemSelector from '../ItemSelector';
import OrderScratchPad from '../OrderScratchPad';
import OrderTotal from '../OrderTotal';
import Modal from '../HOC/Modal';
import { getItems } from '../../redux/actions/items';
import { addParty, saveOrder, saveSplitOrder } from '../../redux/actions/party';
import { openModal, closeModal, openSplitModal, closeSplitModal } from '../../redux/actions/modal';
import { sendPayment } from '../../redux/actions/payments';
import { Button } from '../../global-styles/styledComponents';

import * as s from './styles';

class PartyPage extends React.Component {
  constructor(props) {
    super(props);

    this.total = 0;
  }

  state = {
    splitCheck: [],
    order: this.props.order,
    subTotal: Number(
      this.props.order.reduce((acc, foodItem) => acc + foodItem.price, 0).toFixed(2)
    ),
    localRef: 0 // eslint-disable-line react/no-unused-state
  };

  componentDidMount() {
    this.props.getItems();
  }

  openModal = () => {
    this.props.saveOrder(this.state.order);
    this.props.openModal();
  };

  addToSplitCheck = item => {
    this.setState(prev => ({
      splitCheck: [...prev.splitCheck, item]
    }));
  };

  openSplitModal = () => {
    this.props.saveSplitOrder(this.state.splitCheck);
    this.props.closeModal();
    this.props.openSplitModal();
  };

  addItemToOrder = item => {
    this.setState(prev => ({
      order: [...prev.order, { ...item, localRef: prev.localRef }],
      localRef: prev.localRef + 1,
      subTotal: Number(
        (prev.order.reduce((acc, foodItem) => acc + foodItem.price, 0) + item.price).toFixed(2)
      )
    }));
  };

  removeItemFromOrder = item => {
    this.setState(prev => ({
      order: prev.order.filter(orderItem => orderItem.localRef !== item.localRef),
      subTotal: Number(
        (prev.order.reduce((acc, foodItem) => acc + foodItem.price, 0) - item.price).toFixed(2)
      )
    }));
  };

  saveParty = () => {
    this.props.addParty({ tables: this.props.tables, order: this.state.order });
    this.props.history.push('/tables');
  };

  setTotal = total => {
    this.total = total;
  };

  saveToken = token => {
    this.props.sendPayment(token, this.total * 100, 'dgaishn');
  };

  render() {
    return (
      <React.Fragment>
        <Prompt when={this.props.order.length} message="Leave?" />
        {this.props.modalIsOpen && (
          <Modal>
            {this.props.order.map(item => (
              <div key={shortid.generate()}>
                {item.name}
                <div onClick={() => this.addToSplitCheck(item)}>+</div>
              </div>
            ))}
            <s.Title>
              <h2>Checkout Modal</h2>
              <div>Server Name</div>
            </s.Title>
            <s.Order>your order and shit</s.Order>
            <div>
              <OrderTotal
                subTotal={this.state.subTotal}
                location={this.props.location}
                setTotal={this.setTotal}
              />
            </div>
            <s.OrderButtons>
              <Button dark type="button" onClick={this.openSplitModal}>
                Split Check
              </Button>
              <StripeCheckout
                name="POS Checkout"
                description="subtitle"
                ComponentClass="div"
                currency="USD"
                email="test@test.com"
                stripeKey="pk_test_0axArT8SI2u6aiUnuQH2lJzg"
                image="https://beej.us/images/beejthumb.gif"
                token={this.saveToken}
                allowRememberMe={false}
                amount={this.state.subTotal * 100}
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
        <s.Container modalOpen={this.props.modalIsOpen}>
          <TablesPageTitle tables={this.props.tables} />
          <s.Food>
            {/* // TODO: figure out how to name things */}
            <ItemSelector items={this.props.items} addItemToOrder={this.addItemToOrder} />
            <OrderScratchPad
              saveParty={this.saveParty}
              order={this.state.order}
              subTotal={this.state.subTotal}
              removeItemFromOrder={this.removeItemFromOrder}
              location={this.props.location}
              openModal={this.openModal}
            />
          </s.Food>
        </s.Container>
      </React.Fragment>
    );
  }
}

const locationType = PropTypes.shape({
  country: PropTypes.string,
  state: PropTypes.string
});

PartyPage.propTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  openSplitModal: PropTypes.func,
  addParty: PropTypes.func,
  saveOrder: PropTypes.func,
  saveSplitOrder: PropTypes.func,
  sendPayment: PropTypes.func,
  getItems: PropTypes.func,
  modalIsOpen: PropTypes.bool,
  splitModalIsOpen: PropTypes.bool,
  closeSplitModal: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  order: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  splitOrder: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  tables: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  location: locationType,
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

PartyPage.defaultProps = {
  openModal: () => {},
  closeModal: () => {},
  openSplitModal: () => {},
  addParty: () => {},
  saveOrder: () => {},
  saveSplitOrder: () => {},
  sendPayment: () => {},
  getItems: () => {},
  history: { push: () => {} },
  closeSplitModal: () => {},
  modalIsOpen: false,
  splitModalIsOpen: false,
  items: [],
  order: [],
  splitOrder: [],
  tables: [{ number: 4 }],
  location: { country: 'US', state: 'CA' }
};

const mapStateToProps = state => ({
  modalIsOpen: state.modal.isOpen,
  splitModalIsOpen: state.modal.splitModalIsOpen,
  items: state.items.itemList,
  order: state.party.order,
  tables: state.party.tables,
  splitOrder: state.party.splitOrder,
  location: state.restaurant.restaurantInfo.location
});

export default connect(
  mapStateToProps,
  {
    addParty,
    getItems,
    saveOrder,
    saveSplitOrder,
    openModal,
    closeModal,
    openSplitModal,
    closeSplitModal,
    sendPayment
  }
)(PartyPage);
