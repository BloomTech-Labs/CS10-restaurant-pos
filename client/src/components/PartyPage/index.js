import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TablesPageTitle from '../TablesPageTitle';
import ItemSelector from '../ItemSelector';
import OrderScratchPad from '../OrderScratchPad';
import Modal from '../HOC/Modal';
import { getItems } from '../../redux/actions/items';
import { openModal, closeModal } from '../../redux/actions/modal';

import * as s from './styles';

class PartyPage extends React.Component {
  state = {
    order: [],
    subTotal: 0,
    localRef: 0 // eslint-disable-line react/no-unused-state
  };

  componentDidMount() {
    this.props.getItems();
  }

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

  render() {
    return (
      <React.Fragment>
        {this.props.modalIsOpen && (
          <Modal>
            <div>Checkout Modal</div>
          </Modal>
        )}
        <s.Container modalOpen={this.props.modalIsOpen}>
          <TablesPageTitle tables={this.props.tables} />
          <s.Food>
            {/* // TODO: figure out how to name things */}
            <ItemSelector items={this.props.items} addItemToOrder={this.addItemToOrder} />
            <OrderScratchPad
              order={this.state.order}
              subTotal={this.state.subTotal}
              removeItemFromOrder={this.removeItemFromOrder}
              location={this.props.location}
              openModal={this.props.openModal}
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
  getItems: PropTypes.func,
  modalIsOpen: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  tables: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  location: locationType
};

PartyPage.defaultProps = {
  openModal: () => {},
  getItems: () => {},
  modalIsOpen: false,
  items: [],
  tables: [{ number: 1 }, { number: 6 }, { number: 3 }],
  location: { country: 'US', state: 'CA' }
};

const mapStateToProps = (state) => ({
  modalIsOpen: state.modal.isOpen,
  items: state.items.itemList,
  location: state.restaurant.restaurantInfo.location,
  store: state
});

export default connect(
  mapStateToProps,
  { openModal, closeModal, getItems }
)(PartyPage);
