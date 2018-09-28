import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';
import shortid from 'shortid';

import ItemSelector from '../ItemSelector';
import OrderScratchPad from '../../Presentational/OrderScratchPad';
import CheckoutModal from '../../Presentational/CheckoutModal';
import { getItems } from '../../../redux/actions/items';
import { updateParty, saveOrder, saveSplitOrder } from '../../../redux/actions/party';
import {
  openModal,
  closeModal,
  openSplitModal,
  closeSplitModal
} from '../../../redux/actions/modal';
import { sendPayment } from '../../../redux/actions/payments';

import * as s from './styles';

class PartyPage extends React.Component {
  constructor(props) {
    super(props);

    this.total = 0;
  }

  state = {
    splitCheck: this.props.splitOrder,
    order: [],
    party: {}
  };

  componentDidMount() {
    this.props.getItems();

    const foundParty = this.props.partyList.find(
      (party) => party._id === this.props.match.params.id
    );
    if (!foundParty) {
      this.props.history.push('/tables');
    } else {
      this.setState({
        order: foundParty.food
      });
    }
  }

  componentDidUpdate(prev) {
    if (
      this.state.order.length !== prev.order.length
      && this.props.splitModalIsOpen !== prev.splitModalIsOpen
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        order: this.props.order
      });
    }
  }

  openModal = () => {
    this.props.saveOrder(this.state.order);
    this.props.openModal();
  };

  toggleSplitCheckItem = (item) => {
    this.setState((prev) => {
      if (prev.splitCheck.find((element) => element.uniqueId === item.uniqueId)) {
        return {
          splitCheck: prev.splitCheck.filter((element) => element.uniqueId !== item.uniqueId)
        };
      }
      return {
        splitCheck: [...prev.splitCheck, item]
      };
    });
  };

  openSplitModal = () => {
    this.props.saveSplitOrder(this.state.splitCheck);
    this.props.closeModal();
    this.props.openSplitModal();
  };

  closeSplitModal = () => {
    this.props.closeSplitModal();
    this.props.openModal();
  };

  addItemToOrder = (item) => {
    this.setState((prev) => ({
      order: [...prev.order, { ...item, uniqueId: shortid.generate() }]
    }));
  };

  removeItemFromOrder = (item) => {
    this.setState((prev) => ({
      order: prev.order.filter((orderItem) => orderItem.uniqueId !== item.uniqueId)
    }));
  };

  saveParty = () => {
    this.props.updateParty(this.props.match.params.id, { food: this.state.order });
    this.props.history.push('/tables');
  };

  setTotal = (total) => {
    this.total = total;
  };

  render() {
    return (
      <StripeProvider apiKey="pk_test_0axArT8SI2u6aiUnuQH2lJzg">
        <React.Fragment>
          <CheckoutModal
            order={this.state.order}
            modalIsOpen={this.props.modalIsOpen}
            splitModalIsOpen={this.props.splitModalIsOpen}
            openSplitModal={this.openSplitModal}
            closeSplitModal={this.closeSplitModal}
            splitOrder={this.state.splitCheck}
            toggleSplitCheckItem={this.toggleSplitCheckItem}
            location={this.props.location}
            subTotal={this.state.subTotal}
            sendPayment={this.props.sendPayment}
            setTotal={this.setTotal}
            total={this.total}
            tables={this.state.party.tables}
            partyId={this.props.match.params.id}
          />
          <s.Container modalOpen={this.props.modalIsOpen}>
            <ItemSelector items={this.props.items} addItemToOrder={this.addItemToOrder} />
            <OrderScratchPad
              tables={this.state.party.tables}
              saveParty={this.saveParty}
              order={this.state.order}
              subTotal={this.state.subTotal}
              setTotal={this.setTotal}
              removeItemFromOrder={this.removeItemFromOrder}
              location={this.props.location}
              openModal={this.openModal}
            />
          </s.Container>
        </React.Fragment>
      </StripeProvider>
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
  updateParty: PropTypes.func,
  saveOrder: PropTypes.func,
  saveSplitOrder: PropTypes.func,
  sendPayment: PropTypes.func,
  getItems: PropTypes.func,
  modalIsOpen: PropTypes.bool,
  splitModalIsOpen: PropTypes.bool,
  closeSplitModal: PropTypes.func,
  order: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  items: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  splitOrder: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  match: PropTypes.shape({
    params: PropTypes.object
  }),
  partyList: PropTypes.arrayOf(PropTypes.object),
  location: locationType,
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

PartyPage.defaultProps = {
  openModal: () => {},
  closeModal: () => {},
  openSplitModal: () => {},
  updateParty: () => {},
  saveOrder: () => {},
  saveSplitOrder: () => {},
  sendPayment: () => {},
  getItems: () => {},
  history: { push: () => {} },
  closeSplitModal: () => {},
  modalIsOpen: false,
  splitModalIsOpen: false,
  order: [{}],
  items: [],
  splitOrder: [],
  partyList: [{ _id: 'defaultpartyid' }],
  match: { params: {} },
  location: { country: 'US', state: 'CA' }
};

const mapStateToProps = (state) => ({
  splitModalIsOpen: state.modal.splitModalIsOpen,
  items: state.items.itemList,
  tables: state.party.tables,
  splitOrder: state.party.splitOrder,
  partyList: state.party.partyList,
  order: state.party.order,
  location: state.restaurant.restaurantInfo.location
});

export default connect(
  mapStateToProps,
  {
    updateParty,
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
