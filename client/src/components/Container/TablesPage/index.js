import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SetType from 'es6-set-proptypes';

import FloorPlan from '../../Presentational/FloorPlan';
import Loading from '../../Presentational/Loading';
import BackButton from '../../Presentational/BackButton';
import FreeFloorPlan from '../../Presentational/FreeFloorPlan';
// import Loading from '../../Presentational/Loading';
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
          <div
            style={{ position: 'absolute', width: '20px', height: '20px' }}
            onClick={this.clearServerTables}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.728 38.501">
              <g id="Union_1" data-name="Union 1" transform="translate(3 3)">
                <path d="M0,16.728,15.772,32.5ZM16.728,0,0,16.728Z" />
                <path
                  style={{ fill: '#707070' }}
                  d="M 15.77248001098633 32.50075912475586 L -4.431152262895921e-07 16.7282772064209 L 15.77248001098633 32.50075912475586 M -4.431152262895921e-07 16.7282772064209 L 16.72827911376953 -2.344970653211931e-06 L -4.431152262895921e-07 16.7282772064209 M 15.77248001098633 35.50075531005859 C 15.00471210479736 35.50075531005859 14.2369441986084 35.20786285400391 13.65115928649902 34.62207794189453 L -2.121320486068726 18.8495979309082 C -2.707105398178101 18.26381301879883 -2.999997854232788 17.49604606628418 -2.999997854232788 16.7282772064209 C -2.999997854232788 15.96051025390625 -2.707105398178101 15.19274234771729 -2.121320486068726 14.60695743560791 L 14.60695934295654 -2.121322393417358 C 15.19274425506592 -2.707107305526733 15.96051216125488 -2.999999761581421 16.72827911376953 -2.999999761581421 C 17.49604797363281 -2.999999761581421 18.26381492614746 -2.707107305526733 18.84959983825684 -2.121322393417358 C 20.02116966247559 -0.9497523307800293 20.02116966247559 0.9497476816177368 18.84959983825684 2.121317625045776 L 4.242639541625977 16.7282772064209 L 17.893798828125 30.37943840026855 C 19.06536865234375 31.5510082244873 19.06536865234375 33.45050811767578 17.893798828125 34.62207794189453 C 17.30801391601563 35.20786285400391 16.54024696350098 35.50075531005859 15.77248001098633 35.50075531005859 Z"
                />
              </g>
            </svg>
          </div>
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
