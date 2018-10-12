import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getItems, deleteItem } from '../../../redux/actions/items';
import Loading from '../../Presentational/Loading';
import ItemSelector from '../ItemSelector';

import * as s from './styles';

class MenuPage extends React.Component {
  componentDidMount() {
    this.props.getItems();
  }

  render() {
    const { authed, items, categories, loading, history } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <s.Container>
        <ItemSelector
          authed={authed}
          categories={categories}
          items={items}
          getItems={this.props.getItems}
          deleteItem={this.props.deleteItem}
          menuPath={history.location.pathname === '/menu'}
        />
      </s.Container>
    );
  }
}

MenuPage.propTypes = {
  authed: PropTypes.bool,
  loading: PropTypes.bool,
  history: PropTypes.shape(PropTypes.obj),
  items: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.string),
  getItems: PropTypes.func,
  deleteItem: PropTypes.func
};

MenuPage.defaultProps = {
  authed: false,
  loading: false,
  history: { location: {} },
  items: [{}],
  categories: ['All'],
  getItems: () => {},
  deleteItem: () => {}
};

const mapStateToProps = (state) => ({
  authed: state.auth.role.admin || state.auth.role.manager,
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
  { getItems, deleteItem }
)(MenuPage);
