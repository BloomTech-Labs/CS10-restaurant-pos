import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import OrderItem from '../OrderItem';

import * as s from './styles';

export default function OrderScratchPad(props) {
  const { itemAction, ItemButton, splitOrder } = props;
  return (
    <s.Scroll>
      {props.order.map(item => (
        <OrderItem
          key={shortid.generate()}
          item={item}
          ItemButton={ItemButton}
          itemAction={itemAction}
          checked={!!splitOrder.find(splitItem => splitItem.localRef === item.localRef)}
        />
      ))}
    </s.Scroll>
  );
}

OrderScratchPad.propTypes = {
  order: PropTypes.arrayOf(PropTypes.object), // TODO: define shape later
  splitOrder: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  itemAction: PropTypes.func,
  ItemButton: PropTypes.func,
};

OrderScratchPad.defaultProps = {
  order: [],
  splitOrder: [],
  itemAction: () => {},
  ItemButton: () => <div />,
};
