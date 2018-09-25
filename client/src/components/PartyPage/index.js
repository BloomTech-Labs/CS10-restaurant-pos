import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';
import shortid from 'shortid';

import ItemSelector from '../ItemSelector';
import OrderScratchPad from '../OrderScratchPad';
import CheckoutModal from '../CheckoutModal';
import { getItems } from '../../redux/actions/items';
import { updateParty, saveOrder, saveSplitOrder } from '../../redux/actions/party';
import { openModal, closeModal, openSplitModal, closeSplitModal } from '../../redux/actions/modal';
import { sendPayment } from '../../redux/actions/payments';

import * as s from './styles';

class PartyPage extends React.Component {
  constructor(props) {
    super(props);

    this.total = 0;
  }

  state = {
    splitCheck: this.props.splitOrder,
    order: [],
    subTotal: 0,
    party: {}
  };

  componentDidMount() {
    this.props.getItems();
    this.findParty();
  }

  componentDidUpdate(prev) {
    const foundParty = this.props.partyList.find(party => party._id === this.props.match.params.id);

    if (!foundParty) {
      this.props.history.push('/tables');
    } else if (this.state.order.length !== foundParty.food.length
      && this.props.splitModalIsOpen !== prev.splitModalIsOpen) {
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        order: foundParty.food,
      });
    }
  }

  findParty = () => {
    const foundParty = this.props.partyList.find(party => party._id === this.props.match.params.id);
    if (foundParty) {
      this.setState(prev => {
        const newOrder = prev.order.concat(foundParty.food).map(item => {
          item.localRef = shortid.generate();
          return item;
        });

        return {
          party: foundParty,
          order: newOrder,
          subTotal: Number(
            newOrder.reduce((acc, foodItem) => acc + foodItem.price, 0).toFixed(2)
          ),
        };
      });
    }
  };

  openModal = () => {
    this.props.saveOrder(this.state.order);
    this.props.openModal();
  };

  toggleSplitCheckItem = item => {
    this.setState(prev => {
      if (prev.splitCheck.find(element => element.localRef === item.localRef)) {
        return {
          splitCheck: prev.splitCheck.filter(element => element.localRef !== item.localRef)
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

  addItemToOrder = item => {
    this.setState(prev => ({
      order: [...prev.order, { ...item, localRef: shortid.generate() }],
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
    this.props.updateParty(this.props.match.params.id, { food: this.state.order });
    this.props.history.push('/tables');
  };

  setTotal = total => {
    console.log('total', total);
    this.total = total;
  };

  render() {
    console.warn('hhhhhhhhhhhhh', this.props.match.params.id);
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
            {/* // TODO: figure out how to name things */}
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
  items: [],
  splitOrder: [],
  partyList: [{ _id: 'defaultpartyid' }],
  match: { params: {} },
  location: { country: 'US', state: 'CA' }
};

const mapStateToProps = state => ({
  splitModalIsOpen: state.modal.splitModalIsOpen,
  items: state.items.itemList,
  tables: state.party.tables,
  splitOrder: state.party.splitOrder,
  partyList: state.party.partyList,
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
