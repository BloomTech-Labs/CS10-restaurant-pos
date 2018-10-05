import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SetType from 'es6-set-proptypes';

import FloorPlan from '../../Presentational/FloorPlan';
import Loading from '../../Presentational/Loading';
import BackButton from '../../Presentational/BackButton';
import FreeFloorPlan from '../../Presentational/FreeFloorPlan';
import {
  getTables,
  moveTable,
  toggleTable,
  clearServerTables
} from '../../../redux/actions/tables';
import { getParties, clearSelected } from '../../../redux/actions/party';

import * as s from './styles';

class TablesPage extends Component {
  constructor(props) {
    super(props);

    this.floorplanParent = React.createRef();
  }

  componentDidMount() {
    const { match } = this.props;
    this.props.getTables(match.params.id);
    this.props.getParties();
  }

  componentWillUnmount() {
    this.props.clearSelected();
  }

  clearServerTables = () => {
    this.props.clearServerTables();
  };

  openParty = tableNumber => {
    const foundParty = this.props.partyList
      .find(party => party.tables
        .find(table => table.number === tableNumber));

    if (foundParty) {
      this.props.history.push(`/party/${foundParty._id}`);
    } else {
      console.error('some stuff reallllly went wrong in TablesPage Container');
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
      serverTables,
      match,
      loading
    } = this.props;

    let tablesToDisplay = tables;
    if (!membership) {
      tablesToDisplay = tables.slice(0, 5);
    }

    if (loading) {
      return <Loading />;
    }

    if (!membership) {
      return (
        <s.FreeFloorPlanContainer>
          {match.params.id && (
            <BackButton />
          )}
          <FreeFloorPlan
            membership={membership}
            tables={tablesToDisplay}
            selected={selected}
            toggleTable={this.toggleTable}
            openParty={this.openParty}
            serverTables={serverTables}
          />
        </s.FreeFloorPlanContainer>
      );
    }

    return (
      <s.FloorPlanContainer innerRef={this.floorplanParent}>
        {match.params.id && (
          <BackButton action={this.clearServerTables} />
        )}
        <React.Fragment>
          {this.floorplanParent.current && (
            <FloorPlan
              editing={editing && authorized}
              tables={tablesToDisplay}
              selectable={!match.params.id}
              selected={selected}
              moveTable={moveTableAction}
              toggleTable={this.toggleTable}
              parent={this.floorplanParent}
              openParty={this.openParty}
              serverTables={serverTables}
            />
          )}
        </React.Fragment>
      </s.FloorPlanContainer>
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
  loading: PropTypes.bool,
  tables: PropTypes.arrayOf(PropTypes.object),
  serverTables: PropTypes.arrayOf(PropTypes.number),
  partyList: PropTypes.arrayOf(PropTypes.object),
  getTables: PropTypes.func,
  moveTable: PropTypes.func,
  getParties: PropTypes.func,
  toggleTable: PropTypes.func,
  clearSelected: PropTypes.func,
  clearServerTables: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  match: PropTypes.shape({
    params: PropTypes.object
  })
};

TablesPage.defaultProps = {
  selected: new Set(),
  editing: false,
  role: { admin: false, manager: false },
  membership: false,
  loading: true,
  tables: [],
  serverTables: [],
  partyList: [{ _id: 'defaultpartyid' }],
  getTables: () => {},
  moveTable: () => {},
  getParties: () => {},
  toggleTable: () => {},
  clearSelected: () => {},
  clearServerTables: () => {},
  history: { push: () => {} },
  match: { params: {} }
};

const mapStateToProps = state => ({
  selected: state.tables.selected,
  tables: state.tables.tableList,
  editing: state.tables.editing,
  role: state.auth.role,
  partyList: state.party.partyList,
  serverTables: state.tables.serverTables,
  membership: state.auth.membership,
  loading: state.tables.loading && state.party.loading
});

export default connect(
  mapStateToProps,
  { getTables, moveTable, toggleTable, getParties, clearSelected, clearServerTables }
)(TablesPage);
