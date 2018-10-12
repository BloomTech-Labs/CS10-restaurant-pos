import React from 'react';
import PropTypes from 'prop-types';

import { getRoleString } from '../../../redux/helpers/misc';

import * as s from './styles';

class Server extends React.Component {
  state = {
    showDropdown: false
  };

  toggleDropDown = (e) => {
    if (e) e.stopPropagation();

    this.setState((prev) => ({
      showDropdown: !prev.showDropdown
    }));
  };

  promoteEmployee = (e) => {
    e.stopPropagation();
    this.props
      .update(this.props.server._id, { admin: false, manager: true })
      .then(() => {
        this.props.getServers();
      })
      .catch((err) => console.error(err));
    this.toggleDropDown();
  };

  deleteEmployee = (e) => {
    e.stopPropagation();
    this.props
      .deleteEmployee(this.props.server._id)
      .then(() => {
        this.props.getServers();
      })
      .catch((err) => console.error(err));
    this.toggleDropDown();
  };

  render() {
    const { server, push } = this.props;
    const imageToDisplay = server.images
      ? server.images.small
      : 'https://storage.googleapis.com/main-course-images/man-303792_640.png';

    return (
      <React.Fragment>
        <s.ServerBox
          onClick={() => push(`/tables/${server.name.replace(/\s/, '_')}/${server._id}`)}
          noHover={this.state.showDropdown}
        >
          <s.ProfilePic>
            <img src={imageToDisplay} alt="user profile" width="125px" />
          </s.ProfilePic>
          <div>{server.name}</div>
          <div>{getRoleString(server.role, true)}</div>
          <s.DropDownDots onClick={this.toggleDropDown}>
            <div />
            <div />
            <div />
          </s.DropDownDots>
          <s.DropDownDisplay show={this.state.showDropdown}>
            {server.role.admin ? null : (
              <React.Fragment>
                <s.Option onClick={this.promoteEmployee}>Promote to Manager</s.Option>
                <s.Option onClick={this.deleteEmployee}>Remove Employee</s.Option>
              </React.Fragment>
            )}
          </s.DropDownDisplay>
        </s.ServerBox>
        <s.Overlay onClick={this.toggleDropDown} show={this.state.showDropdown} />
      </React.Fragment>
    );
  }
}

Server.propTypes = {
  server: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    parties: PropTypes.arrayOf(PropTypes.object),
    role: PropTypes.object
  }),
  push: PropTypes.func,
  update: PropTypes.func,
  deleteEmployee: PropTypes.func,
  getServers: PropTypes.func
};

Server.defaultProps = {
  server: {
    _id: '',
    name: 'RandyCarlFace',
    parties: [{}],
    role: {}
  },
  push: () => {},
  update: () => {},
  deleteEmployee: () => {},
  getServers: () => {}
};

export default Server;
