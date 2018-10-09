import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

class Server extends React.Component {
  state = {
    showDropdown: false
  };

  toggleDropDown = e => {
    e.stopPropagation();
    this.setState(prev => ({
      showDropdown: !prev.showDropdown
    }));
  };

  render() {
    const { server, push } = this.props;
    const imageToDisplay = server.images
      ? server.images.medium
      : 'https://images.unsplash.com/photo-1500649297466-74794c70acfc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ce5cca94a31b3b2c59c9ff1002079ed9&auto=format&fit=crop&w=300&q=60';

    return (
      <React.Fragment>
        <s.ServerBox
          onClick={() => push(`/tables/${server.name.replace(/\s/, '_')}/${server._id}`)}
          noHover={this.state.showDropdown}
        >
          <s.ProfilePic>
            <img src={imageToDisplay} alt="user profile" />
          </s.ProfilePic>
          <div>{server.name}</div>
          <s.DropDownDotsThing onClick={this.toggleDropDown}>
            <div />
            <div />
            <div />
          </s.DropDownDotsThing>
          <s.DropdownThingy show={this.state.showDropdown}>
            <s.Option>
              Promote to Manager
            </s.Option>
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
    parties: PropTypes.arrayOf(
      PropTypes.shape({
        food: PropTypes.array,
        tables: PropTypes.arrayOf(PropTypes.object)
      })
    )
  }),
  push: PropTypes.func
};

Server.defaultProps = {
  server: {
    name: 'RandyCarlFace',
    parties: [
      {
        food: [],
        tables: [
          {
            number: 1
          },
          {
            number: 3
          }
        ]
      },
      {
        food: [],
        tables: [
          {
            number: 2
          }
        ]
      }
    ]
  },
  push: () => {}
};

export default Server;
