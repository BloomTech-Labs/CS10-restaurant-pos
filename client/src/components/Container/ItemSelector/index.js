import React from 'react';
import PropTypes from 'prop-types';

import Item from '../../Presentational/Item';
import CategorySelector from '../../Presentational/CategorySelector';
import BackButton from '../../Presentational/BackButton';

import * as s from './styles';

class ItemSelector extends React.Component {
  state = {
    filtered: [],
    category: 'All',
  };

  componentDidMount() {
    this.props.getItems()
      .then(() => this.filter('All'))
      .catch((err) => console.error(err));
  }

  addItemToOrder = (item) => {
    this.props.addItemToOrder(item);
  };

  filter = (category) => {
    if (category === 'All') {
      console.log('sjd');
      this.setState({
        filtered: this.props.items,
        category,
      });
    } else {
      this.setState({
        filtered: this.props.items.filter((item) => item.category === category),
        category,
      });
    }
  };

  render() {
    return (
      <s.Container>
        <div style={{ position: 'relative' }}>
          <BackButton />
          <CategorySelector
            categories={this.props.categories}
            selected={this.state.category}
            filter={this.filter}
          />
        </div>
        <s.Items>
          {this.state.filtered.map((item) => (
            <Item
              key={item._id}
              addItemToOrder={this.addItemToOrder}
              item={item}
            />
          ))}
        </s.Items>
      </s.Container>
    );
  }
}

ItemSelector.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object), // TODO: define shape later
  categories: PropTypes.arrayOf(PropTypes.string),
  addItemToOrder: PropTypes.func,
  getItems: PropTypes.func,
};

ItemSelector.defaultProps = {
  items: [],
  categories: ['All'],
  addItemToOrder: () => {},
  getItems: () => {},
};

export default ItemSelector;
