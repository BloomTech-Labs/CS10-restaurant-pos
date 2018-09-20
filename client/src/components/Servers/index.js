import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getServers } from '../../redux/actions/servers';

class Servers extends Component {
  componentDidMount() {
    this.props.getServers();
  }

  render() {
    return (
      <div>
        <h2>Servers</h2>
        {this.props.serverList.map(server => (
          <div key={server._id}>{server.name}</div>
        ))}
      </div>
    );
  }
}

// TODO: Define role type and change above logic to fit with the new data

Servers.propTypes = {
  getServers: PropTypes.func,
  serverList: PropTypes.arrayOf(PropTypes.object), // TODO: Define object shape
};

Servers.defaultProps = {
  getServers: () => {},
  serverList: [{ name: 'Jimmy', _id: '38hiodsn' }, { name: 'Randy', _id: 'dgas98yh3n2' }, { name: 'Carl', _id: 'asg0hio2n3' }],
};

const mapStateToProps = (state) => ({
  serverList: state.servers.serverList,
});

export default connect(mapStateToProps, { getServers })(Servers);
