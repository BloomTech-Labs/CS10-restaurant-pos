import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SetType from 'es6-set-proptypes';

import FloorPlan from '../../Presentational/FloorPlan';
import Tables from '../../Tables';
import { getTables, moveTable, toggleTable } from '../../../redux/actions/tables';
import { getParties, clearSelected } from '../../../redux/actions/party';

import * as s from './styles';

class TablesPage extends Component {
  constructor(props) {
    super(props);

    this.floorplanParent = React.createRef();
  }

  componentDidMount() {
    this.props.getTables();
    this.props.getParties();
  }

  componentWillUnmount() {
    this.props.clearSelected();
  }

  openParty = tableNumber => {
    const foundParty = this.props.partyList
      .find(party => party.tables
        .find(table => table.number === tableNumber));

    if (foundParty) {
      this.props.history.push(`/party/${foundParty._id}`);
    } else {
      console.error('some stuff reallllly went wrong here');
    }
  };

  toggleTable = table => {
    this.props.toggleTable(table);
  };

  render() {
    const authorized = this.props.role.admin || this.props.role.manager;
    const {
      membership,
      editing,
      tables,
      selected,
      moveTable: moveTableAction,
    } = this.props;

    return (
      <React.Fragment>
        {membership ? (
          <s.FloorPlanContainer innerRef={this.floorplanParent}>
            {this.floorplanParent.current && (
              <FloorPlan
                editing={editing && authorized}
                tables={tables}
                selected={selected}
                moveTable={moveTableAction}
                toggleTable={this.toggleTable}
                parent={this.floorplanParent}
                openParty={this.openParty}
              />
            )}
          </s.FloorPlanContainer>
        ) : (
          <Tables
            membership={membership}
            tables={tables}
            selected={selected}
            toggleTable={this.toggleTable}
            openParty={this.openParty}
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
  partyList: PropTypes.arrayOf(PropTypes.object),
  getTables: PropTypes.func,
  moveTable: PropTypes.func,
  getParties: PropTypes.func,
  toggleTable: PropTypes.func,
  clearSelected: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

TablesPage.defaultProps = {
  selected: new Set(),
  editing: false,
  role: { admin: false, manager: false },
  membership: false,
  tables: [],
  partyList: [{ _id: 'defaultpartyid' }],
  getTables: () => {},
  moveTable: () => {},
  getParties: () => {},
  toggleTable: () => {},
  clearSelected: () => {},
  history: { push: () => {} }
};

const mapStateToProps = state => ({
  selected: state.tables.selected,
  tables: state.tables.tableList,
  editing: state.tables.editing,
  role: state.auth.role,
  partyList: state.party.partyList,
  membership: state.auth.membership
});

export default connect(
  mapStateToProps,
  { getTables, moveTable, toggleTable, getParties, clearSelected }
)(TablesPage);
