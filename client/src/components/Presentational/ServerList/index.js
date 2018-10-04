import React from 'react';
import PropTypes from 'prop-types';

import Server from '../Server';

import * as s from './styles';

export default function ServerList(props) {
  const { serverList, push } = props;
  console.log(serverList);
  return (
    <s.Container>
      {serverList.map((server) => (
        <Server key={server._id} server={server} push={push} />
      ))}
    </s.Container>
  );
}

ServerList.propTypes = {
  serverList: PropTypes.arrayOf(PropTypes.object), // TODO: Define object shape
  push: PropTypes.func
};

ServerList.defaultProps = {
  // TODO: Like these curves? Just for you...
  serverList: [
    {
      _id: '38hiodsn',
      name: 'Jimmy',
      images: { thumbnail: '', small: '', medium: '' },
      parties: [
        {
          tables: [
            {
              _id: 'someTableId',
              restuarant: 'someRestaurantId',
              active: true,
              x: 50,
              y: 50,
              number: 1
            }
          ],
          food: []
        }
      ]
    },
    {
      _id: 'dgas98yh3n2',
      name: 'Randy',
      images: { thumbnail: '', small: '', medium: '' },
      parties: [
        {
          tables: [
            {
              _id: 'someTableId',
              restuarant: 'someRestaurantId',
              active: true,
              x: 50,
              y: 50,
              number: 1
            }
          ],
          food: []
        }
      ]
    },
    {
      _id: 'asg0hio2n3',
      name: 'Carl',
      images: { thumbnail: '', small: '', medium: '' },
      parties: [
        {
          tables: [
            {
              _id: 'someTableId',
              restuarant: 'someRestaurantId',
              active: true,
              x: 50,
              y: 50,
              number: 1
            }
          ],
          food: []
        }
      ]
    }
  ],
  push: () => {}
};
