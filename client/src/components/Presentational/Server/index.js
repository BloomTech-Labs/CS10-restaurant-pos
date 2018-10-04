import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

export default function Server(props) {
  const { server, push } = props;
  const imageToDisplay = server.images
    ? server.images.medium
    : 'https://images.unsplash.com/photo-1531752059180-d0b20f5ee924?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=928c0c096b86c12619290c36b4c6350d&auto=format&fit=crop&w=150&q=60';

  return (
    // TODO: Get the free table view version of this working
    <s.ServerBox onClick={() => push(`/tables/${server.name.replace(/\s/, '_')}/${server._id}`)}>
      <div>{server.name}</div>
      <s.ProfilePic>
        <img src={imageToDisplay} alt="user profile" />
      </s.ProfilePic>
    </s.ServerBox>
  );
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
