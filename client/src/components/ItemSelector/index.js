import React from 'react';
import PropTypes from 'prop-types';

import TablesPageTitle from '../TablesPageTitle';

import * as s from './styles';

class ItemSelector extends React.Component {
  render() {
    return (
      <s.Container>
        <TablesPageTitle tables={this.props.tables} />
        <s.ItemsContainer>
          {this.props.items.map((item) => (
            <s.Boxes key={item._id} onClick={() => this.props.addItemToOrder(item)}>
              <s.ItemTitle>{item.name}</s.ItemTitle>
              <s.ItemDescription>{item.description}</s.ItemDescription>
              <s.ItemPrice>{item.price}</s.ItemPrice>
            </s.Boxes>
          ))}
        </s.ItemsContainer>
      </s.Container>
    );
  }
}

ItemSelector.propTypes = {
  tables: PropTypes.arrayOf(PropTypes.object), // TODO: define shape later
  items: PropTypes.arrayOf(PropTypes.object), // TODO: define shape later
  addItemToOrder: PropTypes.func
};

ItemSelector.defaultProps = {
  tables: [],
  items: [],
  addItemToOrder: () => {}
};

export default ItemSelector;
