import React from 'react';
import PropTypes from 'prop-types';

import Item from '../../Presentational/Item';
import CategorySelector from '../../Presentational/CategorySelector';

import * as s from './styles';

class ItemSelector extends React.Component {
  state = {
    filtered: [],
    category: 'All'
  };

  componentDidMount() {
    this.filter('All');
  }

  addItemToOrder = item => {
    this.props.addItemToOrder(item);
  };

  filter = category => {
    if (category === 'All') {
      this.setState({
        filtered: this.props.items
      });
    } else {
      this.setState({
        filtered: this.props.items.filter(item => item.category === category)
      });
    }
  };

  render() {
    return (
      <s.Container>
        <div>
          <div style={{ position: 'absolute', width: '20px', height: '20px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.728 38.501">
              <g id="Union_1" data-name="Union 1" transform="translate(3 3)">
                <path d="M0,16.728,15.772,32.5ZM16.728,0,0,16.728Z" />
                {/* eslint-disable-next-line */}
                <path style={{ fill: '#707070' }} d="M 15.77248001098633 32.50075912475586 L -4.431152262895921e-07 16.7282772064209 L 15.77248001098633 32.50075912475586 M -4.431152262895921e-07 16.7282772064209 L 16.72827911376953 -2.344970653211931e-06 L -4.431152262895921e-07 16.7282772064209 M 15.77248001098633 35.50075531005859 C 15.00471210479736 35.50075531005859 14.2369441986084 35.20786285400391 13.65115928649902 34.62207794189453 L -2.121320486068726 18.8495979309082 C -2.707105398178101 18.26381301879883 -2.999997854232788 17.49604606628418 -2.999997854232788 16.7282772064209 C -2.999997854232788 15.96051025390625 -2.707105398178101 15.19274234771729 -2.121320486068726 14.60695743560791 L 14.60695934295654 -2.121322393417358 C 15.19274425506592 -2.707107305526733 15.96051216125488 -2.999999761581421 16.72827911376953 -2.999999761581421 C 17.49604797363281 -2.999999761581421 18.26381492614746 -2.707107305526733 18.84959983825684 -2.121322393417358 C 20.02116966247559 -0.9497523307800293 20.02116966247559 0.9497476816177368 18.84959983825684 2.121317625045776 L 4.242639541625977 16.7282772064209 L 17.893798828125 30.37943840026855 C 19.06536865234375 31.5510082244873 19.06536865234375 33.45050811767578 17.893798828125 34.62207794189453 C 17.30801391601563 35.20786285400391 16.54024696350098 35.50075531005859 15.77248001098633 35.50075531005859 Z" />
              </g>
            </svg>
          </div>
          <CategorySelector
            categories={this.props.categories}
            selected={this.state.category}
            filter={this.filter}
          />
        </div>
        {this.state.filtered.map(item => (
          <Item key={item._id} addItemToOrder={this.addItemToOrder} item={item} />
        ))}
      </s.Container>
    );
  }
}

ItemSelector.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object), // TODO: define shape later
  categories: PropTypes.arrayOf(PropTypes.string),
  addItemToOrder: PropTypes.func
};

ItemSelector.defaultProps = {
  items: [],
  categories: ['All'],
  addItemToOrder: () => {}
};

export default ItemSelector;
