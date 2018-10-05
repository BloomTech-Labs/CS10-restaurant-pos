import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';

import ItemSelector from '../ItemSelector';
import OrderScratchPad from '../../Presentational/OrderScratchPad';
import CheckoutModal from '../../Presentational/CheckoutModal';
import Loading from '../../Presentational/Loading';
import { getItems } from '../../../redux/actions/items';
import {
  getParties,
  updateParty,
  saveOrder,
  saveSplitOrder,
  toggleSplitCheckItem
} from '../../../redux/actions/party';
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
    order: [],
    tables: [],
    server: ''
  };

  componentDidMount() {
    this.props
      .getParties()
      .then(() => {
        const foundParty = this.props.partyList.find(
          (party) => party._id === this.props.match.params.id
        );

        if (!foundParty) {
          console.log('notfound');
          this.props.history.push('/tables');
        } else {
          console.log(foundParty);
          this.setState({
            order: foundParty.food,
            tables: foundParty.tables,
            server: foundParty.server.name
          });
        }
      })
      .catch((err) => console.error(err));
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
    this.props.toggleSplitCheckItem(item);
  };

  openSplitModal = () => {
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
    this.props.updateParty(this.props.match.params.id, {
      food: this.state.order
    });
    // Push is not dispatched from the update action because
    // the update action is also dispatched in the payment action
    this.props.history.push('/tables');
  };

  setTotal = (total) => {
    this.total = total;
  };

  render() {
    const { order, subTotal, tables, server } = this.state;
    const { splitOrder } = this.props;

    const {
      modalIsOpen,
      splitModalIsOpen,
      location,
      match,
      items,
      loading,
      itemCategories
    } = this.props;

    if (loading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <CheckoutModal
          sendPayment={this.props.sendPayment}
          setTotal={this.setTotal}
          total={this.total}
          openSplitModal={this.openSplitModal}
          closeSplitModal={this.closeSplitModal}
          toggleSplitCheckItem={this.toggleSplitCheckItem}
          order={order}
          modalIsOpen={modalIsOpen}
          splitModalIsOpen={splitModalIsOpen}
          splitOrder={splitOrder}
          location={location}
          subTotal={subTotal}
          tables={tables}
          partyId={match.params.id}
          server={server}
        />
        <s.Container modalOpen={modalIsOpen}>
          <ItemSelector
            categories={itemCategories}
            items={items}
            addItemToOrder={this.addItemToOrder}
            getItems={this.props.getItems}
            partyId={match.params.id}
          />
          <OrderScratchPad
            tables={tables}
            saveParty={this.saveParty}
            order={order}
            subTotal={subTotal}
            setTotal={this.setTotal}
            removeItemFromOrder={this.removeItemFromOrder}
            location={location}
            openModal={this.openModal}
          />
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
  updateParty: PropTypes.func,
  saveOrder: PropTypes.func,
  // saveSplitOrder: PropTypes.func,
  toggleSplitCheckItem: PropTypes.func,
  sendPayment: PropTypes.func,
  getItems: PropTypes.func,
  modalIsOpen: PropTypes.bool,
  splitModalIsOpen: PropTypes.bool,
  closeSplitModal: PropTypes.func,
  getParties: PropTypes.func,
  loading: PropTypes.bool,
  order: PropTypes.arrayOf(PropTypes.object),
  items: PropTypes.arrayOf(PropTypes.object),
  splitOrder: PropTypes.arrayOf(PropTypes.object),
  itemCategories: PropTypes.arrayOf(PropTypes.string),
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
  // saveSplitOrder: () => {},
  toggleSplitCheckItem: () => {},
  sendPayment: () => {},
  getItems: () => {},
  history: { push: () => {} },
  getParties: () => {},
  closeSplitModal: () => {},
  modalIsOpen: false,
  splitModalIsOpen: false,
  loading: true,
  order: [{}],
  items: [{}],
  splitOrder: [{}],
  itemCategories: ['All'],
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
  location: state.restaurant.restaurantInfo.location,
  loading: state.party.loading && state.items.loading,
  itemCategories: state.items.itemList.reduce(
    (acc, currentVal) => {
      if (currentVal.category && !acc.includes(currentVal.category)) {
        acc.push(currentVal.category);
      }
      return acc;
    },
    ['All']
  )
});

export default connect(
  mapStateToProps,
  {
    updateParty,
    getItems,
    saveOrder,
    saveSplitOrder,
    toggleSplitCheckItem,
    openModal,
    closeModal,
    openSplitModal,
    closeSplitModal,
    sendPayment,
    getParties
  }
)(PartyPage);
