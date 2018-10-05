import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import OrderItem from '../OrderItem';

import * as s from './styles';

export default function OrderList(props) {
  const { order, itemAction, ItemButton, splitOrder } = props;

  return (
    <s.Scroll>
      {order.map(item => (
        <OrderItem
          key={shortid.generate()}
          item={item}
          ItemButton={ItemButton}
          itemAction={itemAction}
          checked={!!splitOrder.find(splitItem => splitItem.uniqueId === item.uniqueId)}
        />
      ))}
    </s.Scroll>
  );
}

OrderList.propTypes = {
  order: PropTypes.arrayOf(PropTypes.object),
  splitOrder: PropTypes.arrayOf(PropTypes.object),
  itemAction: PropTypes.func,
  ItemButton: PropTypes.func,
};

OrderList.defaultProps = {
  order: [{}],
  splitOrder: [{}],
  itemAction: () => {},
  ItemButton: () => <div />,
};
