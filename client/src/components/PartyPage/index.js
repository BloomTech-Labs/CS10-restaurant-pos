import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ItemSelector from '../ItemSelector';
import OrderScratchPad from '../OrderScratchPad';
import { getItems } from '../../redux/actions/items';

class PartyPage extends React.Component {
  state = {
    order: [],
    localRef: 0, // eslint-disable-line react/no-unused-state
  }

  componentDidMount() {
    this.props.getItems();
  }

  addItemToOrder = (item) => {
    this.setState((prev) => {
      item.localRef = prev.localRef;
      return {
        order: [ ...prev.order, item ],
        localRef: prev.localRef + 1,
      };
    });
  }

  removeItemFromOrder = (item) => {
    this.setState((prev) => ({
      order: prev.order.filter(orderItem => orderItem.localRef !== item.localRef),
    }));
  }

  render() {
    return (
      <div>
        <ItemSelector items={this.props.items} addItemToOrder={this.addItemToOrder} />
        <OrderScratchPad order={this.state.order} />
      </div>
    );
  }
}

PartyPage.propTypes = {
  getItems: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects
};

PartyPage.defaultProps = {
  getItems: () => {},
  items: []
};

const mapStateToProps = (state) => ({
  items: state.items.itemList
});

export default connect(mapStateToProps, { getItems })(PartyPage);
