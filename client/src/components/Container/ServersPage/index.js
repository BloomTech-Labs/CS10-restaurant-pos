import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getServers } from '../../../redux/actions/servers';
import { changeEmployeeRole, deleteEmployee } from '../../../redux/actions/auth';
import ServerList from '../../Presentational/ServerList';
import Loading from '../../Presentational/Loading';

class ServersPage extends React.Component {
  componentDidMount() {
    this.props.getServers();
  }

  render() {
    const { serverList, history, loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <ServerList
          serverList={serverList}
          push={history.push}
          update={this.props.changeEmployeeRole}
          deleteEmployee={this.props.deleteEmployee}
          getServers={this.props.getServers}
        />
      </React.Fragment>
    );
  }
}

ServersPage.propTypes = {
  getServers: PropTypes.func,
  changeEmployeeRole: PropTypes.func,
  deleteEmployee: PropTypes.func,
  serverList: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

ServersPage.defaultProps = {
  getServers: () => {},
  changeEmployeeRole: () => {},
  deleteEmployee: () => {},
  serverList: [{}],
  loading: true,
  history: { push: () => {} }
};

const mapStateToProps = (state) => ({
  serverList: state.servers.serverList,
  loading: state.servers.loading
});

export default connect(
  mapStateToProps,
  { getServers, changeEmployeeRole, deleteEmployee }
)(ServersPage);
