import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TablesPageTitle from '../TablesPageTitle';
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

  addItemToOrder = item => {
    this.setState(prev => ({
      order: [...prev.order, { ...item, localRef: prev.localRef }],
      localRef: prev.localRef + 1,
      subTotal: Number((prev.subTotal + item.price).toFixed(2))
    }));
  };

  removeItemFromOrder = item => {
    this.setState(prev => ({
      order: prev.order.filter(orderItem => orderItem.localRef !== item.localRef),
      subTotal: Number((prev.subTotal - item.price).toFixed(2))
    }));
  };

  render() {
    return (
      <s.Container>
        <TablesPageTitle tables={this.props.tables} />
        <s.Food> {/* // TODO: figure out how to name things */}
          <ItemSelector items={this.props.items} addItemToOrder={this.addItemToOrder} />
          <OrderScratchPad
            order={this.state.order}
            subTotal={this.state.subTotal}
            removeItemFromOrder={this.removeItemFromOrder}
            location={this.props.location}
          />
        </s.Food>
      </s.Container>
    );
  }
}

const locationType = PropTypes.shape({
  country: PropTypes.string,
  state: PropTypes.string,
});

PartyPage.propTypes = {
  getItems: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  tables: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  location: locationType,
};

PartyPage.defaultProps = {
  getItems: () => {},
  items: [],
  tables: [{ number: 1 }, { number: 6 }, { number: 3 } ],
  location: { country: 'US', state: 'CA' },
};

const mapStateToProps = state => ({
  items: state.items.itemList,
  location: state.restaurant.restaurantInfo.location,
  store: state,
});

export default connect(
  mapStateToProps,
  { getItems }
)(PartyPage);
