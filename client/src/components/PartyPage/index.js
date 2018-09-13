import React from 'react';
import connect from 'react-redux';
import PropTypes from 'prop-types';

import { getItems } from '../../redux/actions/items';

class PartyPage extends React.Component {
  componentDidMount() {
    this.props.getItems();
  }

  render() {
    return (
      <div>
        {this.props.items.map(item => (
          <div key={Math.random()}>{ item.name }</div>
        ))}
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
