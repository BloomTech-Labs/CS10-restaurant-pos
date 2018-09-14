import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ItemSelector from '../ItemSelector';
import OrderScratchPad from '../OrderScratchPad';
import { getItems } from '../../redux/actions/items';

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
      subTotal: Number((prev.subTotal + item.price).toFixed(2)),
    }));
  };

  removeItemFromOrder = (item) => {
    this.setState((prev) => ({
      order: prev.order.filter((orderItem) => orderItem.localRef !== item.localRef),
      subTotal: Number((prev.subTotal - item.price).toFixed(2)),
    }));
  };

  render() {
    return (
      <s.Container>
        <s.Content>
          <ItemSelector items={this.props.items} addItemToOrder={this.addItemToOrder} />
          <OrderScratchPad
            order={this.state.order}
            subTotal={this.state.subTotal}
            removeItemFromOrder={this.removeItemFromOrder}
          />
        </s.Content>
      </s.Container>
    );
  }
}

PartyPage.propTypes = {
  getItems: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.object) // TODO: define shape of the objects
};

PartyPage.defaultProps = {
  getItems: () => {},
  items: []
};

const mapStateToProps = (state) => ({
  items: state.items.itemList
});

export default connect(
  mapStateToProps,
  { getItems }
)(PartyPage);
