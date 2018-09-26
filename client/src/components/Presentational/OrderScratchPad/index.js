import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import TablesPageTitle from '../../TablesPageTitle';
import OrderTotal from '../OrderTotal';
import OrderItem from '../OrderItem';
import { Button } from '../../../global-styles/styledComponents';

import * as s from './styles';

export default function OrderScratchPad(props) {
  return (
    <s.Container>
      <TablesPageTitle tables={props.tables} />
      <s.Scroll>
        {props.order.map(item => (
          <OrderItem
            key={shortid.generate()}
            item={item}
            removeItemFromOrder={props.removeItemFromOrder}
          />
        ))}
      </s.Scroll>
      <s.Checkout>
        <OrderTotal
          location={props.location}
          subTotal={props.subTotal}
          setTotal={props.setTotal}
        />
        <s.ButtonContainer>
          <Button primary dark type="button" onClick={props.saveParty}>
            Save
          </Button>
          <Button dark type="button" onClick={props.openModal}>
            Checkout Now
          </Button>
        </s.ButtonContainer>
      </s.Checkout>
    </s.Container>
  );
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
