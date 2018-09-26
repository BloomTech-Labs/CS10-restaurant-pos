import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getServers } from '../../../redux/actions/servers';
import Servers from '../../Presentational/Servers';

// import * as s from './styles';

class ServersPage extends React.Component {
  componentDidMount() {
    this.props.getServers();
  }

  render() {
    const { serverList } = this.props;
    return (
      <div>
        <Servers serverList={serverList} />
      </div>
    );
  }
}

ServersPage.propTypes = {
  getServers: PropTypes.func,
  serverList: PropTypes.arrayOf(PropTypes.object), // TODO: Define object shape
};

ServersPage.defaultProps = {
  getServers: () => {},
  serverList: [{ name: 'Jimmy', _id: '38hiodsn' }, { name: 'Randy', _id: 'dgas98yh3n2' }, { name: 'Carl', _id: 'asg0hio2n3' }],
};

const mapStateToProps = (state) => ({
  serverList: state.servers.serverList,
});

export default connect(mapStateToProps, { getServers })(ServersPage);
