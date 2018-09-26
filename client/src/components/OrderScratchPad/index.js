import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import TablesPageTitle from '../TablesPageTitle';
import OrderTotal from '../Presentational/OrderTotal';
import { Button } from '../../global-styles/styledComponents';

import * as s from './styles';

class OrderScratchPad extends React.Component {
  render() {
    return (
      <s.Container>
        <TablesPageTitle tables={this.props.tables} />
        <s.Scroll>
          {this.props.order.map(item => (
            <s.Items key={shortid.generate()}>
              <s.DeleteButton onClick={() => this.props.removeItemFromOrder(item)}>
                X
              </s.DeleteButton>
              <span>{item.name}</span>
              <span>{item.price}</span>
            </s.Items>
          ))}
        </s.Scroll>
        <s.Checkout>
          <OrderTotal
            location={this.props.location}
            subTotal={this.props.subTotal}
            setTotal={this.props.setTotal}
          />
          <s.ButtonContainer>
            <Button primary dark type="button" onClick={this.props.saveParty}>
              Save
            </Button>
            <Button dark type="button" onClick={this.props.openModal}>
              Checkout Now
            </Button>
          </s.ButtonContainer>
        </s.Checkout>
      </s.Container>
    );
  }
}

const locationType = PropTypes.shape({
  country: PropTypes.string,
  state: PropTypes.string
});

OrderScratchPad.propTypes = {
  tables: PropTypes.arrayOf(PropTypes.object), // TODO: define shape later
  order: PropTypes.arrayOf(PropTypes.object), // TODO: define shape later
  removeItemFromOrder: PropTypes.func,
  location: locationType,
  subTotal: PropTypes.number,
  setTotal: PropTypes.func,
  openModal: PropTypes.func,
  saveParty: PropTypes.func
};

OrderScratchPad.defaultProps = {
  tables: [],
  order: [],
  subTotal: 0,
  location: { country: 'US', state: 'CA' },
  removeItemFromOrder: () => {},
  setTotal: () => {},
  openModal: () => {},
  saveParty: () => {}
};

export default OrderScratchPad;
