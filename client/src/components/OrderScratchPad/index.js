import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

class OrderScratchPad extends React.Component {
  render() {
    return (
      <div>
        {this.props.order.map((item) => (
          <div key={shortid.generate()}><div>{ item.name }</div><div>{ item.price }</div></div>
        ))}
      </div>
    );
  }
}

OrderScratchPad.propTypes = {
  order: PropTypes.arrayOf(PropTypes.object), // TODO: define shape later
};

OrderScratchPad.defaultProps = {
  order: []
};
export default OrderScratchPad;
