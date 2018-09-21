import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SetType from 'es6-set-proptypes';

import FloorPlan from '../FloorPlan';
import Tables from '../Tables';
import { getTables, moveTable, toggleTable } from '../../redux/actions/tables';

class TablesPage extends Component {
  componentDidMount() {
    this.props.getTables();
  }

  toggleTable = (table) => {
    this.props.toggleTable(table);
  };

  render() {
    const authorized = this.props.role.admin || this.props.role.manager;
    const { membership } = this.props;
    return (
      <React.Fragment>
        {membership ? (
          <FloorPlan
            editing={this.props.editing && authorized}
            tables={this.props.tables}
            selected={this.props.selected}
            moveTable={this.props.moveTable}
            toggleTable={this.toggleTable}
            sidebarRef={this.props.sidebarRef}
            topbarRef={this.props.topbarRef}
          />
        ) : (
          <Tables
            tables={this.props.tables}
            selected={this.props.selected}
            toggleTable={this.toggleTable}
          />
        )}
      </React.Fragment>
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
  membership: PropTypes.bool,
  tables: PropTypes.arrayOf(PropTypes.object),
  getTables: PropTypes.func,
  moveTable: PropTypes.func,
  toggleTable: PropTypes.func,
  topbarRef: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  sidebarRef: PropTypes.any // eslint-disable-line react/forbid-prop-types
};

TablesPage.defaultProps = {
  selected: new Set(),
  editing: false,
  role: { admin: false, manager: false },
  membership: false,
  tables: [],
  getTables: () => {},
  moveTable: () => {},
  toggleTable: () => {},
  topbarRef: false, // hack to let the ternary work
  sidebarRef: false // hack to let the ternary work
};

const mapStateToProps = (state) => ({
  selected: state.tables.selected,
  tables: state.tables.tableList,
  editing: state.tables.editing,
  role: state.auth.role,
  membership: state.auth.membership,
  sidebarRef: state.tables.sidebarRef,
  topbarRef: state.tables.topbarRef
});

export default connect(
  mapStateToProps,
  { getTables, moveTable, toggleTable }
)(TablesPage);
