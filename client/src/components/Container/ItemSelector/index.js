import React from 'react';
import PropTypes from 'prop-types';

import Item from '../../Presentational/Item';
import CategorySelector from '../../Presentational/CategorySelector';
import BackButton from '../../Presentational/BackButton';
import DeletePartyButton from '../../Presentational/DeletePartyButton';

import * as s from './styles';

class ItemSelector extends React.Component {
  state = {
    filtered: [],
    category: 'All'
  };

  componentDidMount() {
    this.filter('All');
  }

  addItemToOrder = (item) => {
    this.props.addItemToOrder(item);
  };

  filter = (category) => {
    if (category === 'All') {
      this.setState({
        filtered: this.props.items,
        category
      });
    } else {
      this.setState({
        filtered: this.props.items.filter((item) => item.category === category),
        category
      });
    }
  };

  render() {
    const { partyId, categories } = this.props;
    return (
      <s.Container style={{ position: 'relative' }}>
        <div style={{ position: 'relative' }}>
          <BackButton />
          <CategorySelector
            categories={categories}
            selected={this.state.category}
            filter={this.filter}
          />
        </div>
        <s.Items>
          {this.state.filtered.map((item) => (
            <Item key={item._id} addItemToOrder={this.addItemToOrder} item={item} />
          ))}
        </s.Items>
        {partyId && <DeletePartyButton partyId={partyId} />}
      </s.Container>
    );
  }
}

ItemSelector.propTypes = {
  partyId: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.string),
  addItemToOrder: PropTypes.func,
};

ItemSelector.defaultProps = {
  partyId: '',
  items: [{}],
  categories: ['All'],
  addItemToOrder: () => {},
};

export default ItemSelector;
