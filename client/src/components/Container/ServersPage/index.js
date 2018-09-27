import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getParties } from '../../../redux/actions/party';
import { getServers } from '../../../redux/actions/servers';
import ServerList from '../../Presentational/ServerList';

// import * as s from './styles';

class ServersPage extends React.Component {
  componentDidMount() {
    this.props.getParties();
    this.props.getServers();
  }

  render() {
    const { serverList, partyList } = this.props;
    return (
      <React.Fragment>
        <ServerList serverList={serverList} partyList={partyList} />
      </React.Fragment>
    );
  }
}

ServersPage.propTypes = {
  getParties: PropTypes.func,
  getServers: PropTypes.func,
  serverList: PropTypes.arrayOf(PropTypes.object), // TODO: Define object shape
  partyList: PropTypes.arrayOf(PropTypes.object) // TODO: Define object shape
};

ServersPage.defaultProps = {
  getParties: () => {},
  getServers: () => {},
  serverList: [
    { name: 'Jimmy', _id: '38hiodsn' },
    { name: 'Randy', _id: 'dgas98yh3n2' },
    { name: 'Carl', _id: 'asg0hio2n3' }
  ],
  partyList: []
};

const mapStateToProps = state => ({
  serverList: state.servers.serverList,
  partyList: state.party.partyList
});

export default connect(
  mapStateToProps,
  { getParties, getServers }
)(ServersPage);
