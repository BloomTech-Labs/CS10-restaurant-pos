import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SetType from 'es6-set-proptypes';

import FloorPlan from '../FloorPlan';
import { getTables, moveTable, toggleTable } from '../../redux/actions/tables';

import * as s from './styles';

class TablesPage extends Component {
  state = {
    authorized: this.props.role.admin || this.props.role.manager,
  };

  componentDidMount() {
    this.props.getTables();
  }

  toggleTable = (table) => {
    this.props.toggleTable(table);
  };

  render() {
    return (
      <s.Container>
        <s.Editor>
          <FloorPlan
            editing={this.props.editing && this.state.authorized}
            tables={this.props.tables}
            selected={this.props.selected}
            moveTable={this.props.moveTable}
            toggleTable={this.toggleTable}
          />
        </s.Editor>
      </s.Container>
    );
  }
}

TablesPage.propTypes = {
  selected: SetType,
  editing: PropTypes.bool,
  role: PropTypes.shape({
    admin: PropTypes.bool,
    manager: PropTypes.bool
  }),
  tables: PropTypes.arrayOf(PropTypes.object),
  getTables: PropTypes.func,
  moveTable: PropTypes.func,
  toggleTable: PropTypes.func,
};

TablesPage.defaultProps = {
  selected: new Set(),
  editing: false,
  role: { admin: false, manager: false },
  tables: [],
  getTables: () => {},
  moveTable: () => {},
  toggleTable: () => {},
};

const mapStateToProps = (state) => ({
  tables: state.tables.tableList,
  role: state.auth.role
});

export default connect(
  mapStateToProps,
  { getTables, moveTable, toggleTable, }
)(TablesPage);
