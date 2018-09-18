import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TablesPageTitle from '../TablesPageTitle';
import ItemSelector from '../ItemSelector';
import OrderScratchPad from '../OrderScratchPad';
import Modal from '../HOC/Modal';
import { getItems } from '../../redux/actions/items';
import { addParty, saveOrder, saveSplitOrder } from '../../redux/actions/party';
import { openModal, closeModal, openSplitModal, closeSplitModal } from '../../redux/actions/modal';

import * as s from './styles';

class PartyPage extends React.Component {
  state = {
    splitCheck: [],
    order: this.props.order,
    subTotal: 0,
    localRef: 0 // eslint-disable-line react/no-unused-state
  };

  componentDidMount() {
    this.props.getItems();

    if (this.props.tables.length === 0) {
      this.props.history.push('/tables');
    }
  }

  openModal = () => {
    this.props.saveOrder(this.state.order);
    this.props.openModal();
  };

  addToSplitCheck = (item) => {
    this.setState((prev) => ({
      splitCheck: [...prev.splitCheck, item]
    }));
  };

  openSplitModal = () => {
    this.props.saveSplitOrder(this.state.splitCheck);
    this.props.closeModal();
    this.props.openSplitModal();
  };

  addItemToOrder = (item) => {
    this.setState((prev) => ({
      order: [...prev.order, { ...item, localRef: prev.localRef }],
      localRef: prev.localRef + 1,
      subTotal: Number((prev.subTotal + item.price).toFixed(2))
    }));
  };

  removeItemFromOrder = (item) => {
    this.setState((prev) => ({
      order: prev.order.filter((orderItem) => orderItem.localRef !== item.localRef),
      subTotal: Number((prev.subTotal - item.price).toFixed(2))
    }));
  };

  addParty = () => {
    // ! send in `server: this.props.server` from
    // ! redux `server: state.auth.user._id`
    // ! * this hasn't been created yet
    this.props.addParty({ tables: this.props.tables, order: this.state.order });
  }

  render() {
    return (
      <React.Fragment>
        {this.props.modalIsOpen && (
          <Modal>
            {this.props.order.map((item) => (
              <div>
                {item.name}
                <div onClick={() => this.addToSplitCheck(item)}>+</div>
              </div>
            ))}
            <div>Checkout Modal</div>
            <button type="button" onClick={this.openSplitModal}>
              Split Check
            </button>
            <button type="button">Checkout</button>
          </Modal>
        )}
        {this.props.splitModalIsOpen && (
          <Modal closeSplitModal={this.closeSplitModal}>
            {this.props.splitOrder.map((item) => (
              <div>{item.name}</div>
            ))}
            <div>Split Modal</div>
            <button type="button">split modal button one</button>
            <button type="button">split modal button two</button>
          </Modal>
        )}
        <s.Container modalOpen={this.props.modalIsOpen}>
          <TablesPageTitle tables={this.props.tables} />
          <s.Food>
            {/* // TODO: figure out how to name things */}
            <ItemSelector items={this.props.items} addItemToOrder={this.addItemToOrder} />
            <OrderScratchPad
              addParty={this.addParty}
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
  state: PropTypes.string,

});

PartyPage.propTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  openSplitModal: PropTypes.func,
  addParty: PropTypes.func,
  saveOrder: PropTypes.func,
  saveSplitOrder: PropTypes.func,
  getItems: PropTypes.func,
  modalIsOpen: PropTypes.bool,
  splitModalIsOpen: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  order: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  splitOrder: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  tables: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  location: locationType,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
};

PartyPage.defaultProps = {
  openModal: () => {},
  closeModal: () => {},
  openSplitModal: () => {},
  addParty: () => {},
  saveOrder: () => {},
  saveSplitOrder: () => {},
  getItems: () => {},
  history: { push: () => {} },
  modalIsOpen: false,
  splitModalIsOpen: false,
  items: [],
  order: [],
  splitOrder: [],
  tables: [{ number: 1 }, { number: 6 }, { number: 3 }],
  location: { country: 'US', state: 'CA' },
};

const mapStateToProps = (state) => ({
  modalIsOpen: state.modal.isOpen,
  splitModalIsOpen: state.modal.splitModalIsOpen,
  items: state.items.itemList,
  order: state.party.order,
  tables: state.party.tables,
  splitOrder: state.party.splitOrder,
  location: state.restaurant.restaurantInfo.location,
  store: state
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
    closeSplitModal
  }
)(PartyPage);
