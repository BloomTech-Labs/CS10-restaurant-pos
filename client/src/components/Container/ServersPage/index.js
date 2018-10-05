import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getServers } from '../../../redux/actions/servers';
import ServerList from '../../Presentational/ServerList';
import Loading from '../../Presentational/Loading';

// import * as s from './styles';

class ServersPage extends React.Component {
  componentDidMount() {
    this.props.getServers();
  }

  render() {
    const { serverList, history, loading } = this.props;

    if (loading) {
      return (
        <Loading />
      );
    }

    return (
      <React.Fragment>
        <ServerList serverList={serverList} push={history.push} />
      </React.Fragment>
    );
  }
}

ServersPage.propTypes = {
  getServers: PropTypes.func,
  serverList: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

ServersPage.defaultProps = {
  getServers: () => {},
  serverList: [{}],
  loading: true,
  history: { push: () => {} },
};

const mapStateToProps = state => ({
  serverList: state.servers.serverList,
  loading: state.servers.loading,
});

export default connect(
  mapStateToProps,
  { getServers }
)(ServersPage);
