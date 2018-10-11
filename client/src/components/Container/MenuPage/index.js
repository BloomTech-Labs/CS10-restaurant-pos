import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getItems } from '../../../redux/actions/items';
import Loading from '../../Presentational/Loading';
import ItemSelector from '../ItemSelector';

import * as s from './styles';

class MenuPage extends React.Component {
  componentDidMount() {
    this.props.getItems();
  }

  render() {
    const { items, categories, loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <s.Container>
        <ItemSelector categories={categories} items={items} getItems={this.props.getItems} />
      </s.Container>
    );
  }
}

MenuPage.propTypes = {
  loading: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.string),
  getItems: PropTypes.func
};

MenuPage.defaultProps = {
  loading: false,
  items: [{}],
  categories: ['All'],
  getItems: () => {}
};

const mapStateToProps = (state) => ({
  loading: state.items.loading,
  items: state.items.itemList,
  categories: state.items.itemList.reduce(
    (acc, currentVal) => {
      if (currentVal.category && !acc.includes(currentVal.category)) {
        acc.push(currentVal.category);
      }
      return acc;
    },
    ['All']
  )
});

export default connect(
  mapStateToProps,
  { getItems }
)(MenuPage);
