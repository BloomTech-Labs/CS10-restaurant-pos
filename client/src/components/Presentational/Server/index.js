import React from 'react';
import PropTypes from 'prop-types';

import { getRoleString } from '../../../redux/helpers/misc';

import * as s from './styles';

class Server extends React.Component {
  state = {
    showDropdown: false
  };

  toggleDropDown = e => {
    if (e) e.stopPropagation();

    this.setState(prev => ({
      showDropdown: !prev.showDropdown
    }));
  };

  promoteEmployee = (e) => {
    e.stopPropagation();
    this.props.update(this.props.server._id, { admin: false, manager: true })
      .then(() => {
        this.props.getServers();
      })
      .catch((err) => console.error(err));
    this.toggleDropDown();
  };

  render() {
    const { server, push } = this.props;
    const imageToDisplay = server.images
      ? server.images.medium
      : 'https://storage.googleapis.com/main-course-images/man-303792_640.png';

    return (
      <React.Fragment>
        <s.ServerBox
          onClick={() => push(`/tables/${server.name.replace(/\s/, '_')}/${server._id}`)}
          noHover={this.state.showDropdown}
        >
          <s.ProfilePic>
            <img src={imageToDisplay} alt="user profile" width="110px" height="110px" />
          </s.ProfilePic>
          <div>{server.name}</div>
          <div>{getRoleString(server.role, true)}</div>
          <s.DropDownDotsThing onClick={this.toggleDropDown}>
            <div />
            <div />
            <div />
          </s.DropDownDotsThing>
          <s.DropdownThingy show={this.state.showDropdown}>
            <s.Option onClick={this.promoteEmployee}>Promote to Manager</s.Option>
          </s.DropdownThingy>
        </s.ServerBox>
        <s.Overlay onClick={this.toggleDropDown} show={this.state.showDropdown} />
      </React.Fragment>
    );
  }
}

Server.propTypes = {
  server: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
    parties: PropTypes.arrayOf(PropTypes.shape(PropTypes.object))
  }),
  push: PropTypes.func,
  update: PropTypes.func,
  getServers: PropTypes.func,
};

Server.defaultProps = {
  server: {
    name: 'RandyCarlFace',
    parties: [{}]
  },
  push: () => {},
  update: () => {},
  getServers: () => {},
};

export default Server;
