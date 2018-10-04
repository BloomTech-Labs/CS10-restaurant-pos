import React from 'react';
import PropTypes from 'prop-types';

import Clock from '../Clock';
import Date from '../Date';
import CurrentUser from '../CurrentUser';

import * as s from './styles';

export default function Topbar(props) {
  const { name, logoutEmployee, role, loggedIn, landing, image } = props;

  if (landing && !loggedIn) {
    return (
      <s.Topbar alignEnd>
        <s.StyledLink to="/login">(Login)</s.StyledLink>
        <s.StyledLink to="/register">(Register)</s.StyledLink>
      </s.Topbar>
    );
  }

  if (landing && loggedIn) {
    return (
      <s.Topbar alignEnd>
        <s.StyledLink to="/tables">Proceed To Restaurant</s.StyledLink>
      </s.Topbar>
    );
  }

  return (
    <s.Topbar blur={props.blur}>
      <s.TimeDisplay>
        <Clock />
        <Date />
      </s.TimeDisplay>
      <h1>Main Course</h1>
      {loggedIn ? (
        <CurrentUser name={name} role={role} action={logoutEmployee} image={image} />
      ) : (
        <div />
      )}
    </s.Topbar>
  );
}

Topbar.propTypes = {
  blur: PropTypes.bool,
  name: PropTypes.string,
  role: PropTypes.string,
  image: PropTypes.string,
  loggedIn: PropTypes.bool,
  landing: PropTypes.bool,
  logoutEmployee: PropTypes.func
};

Topbar.defaultProps = {
  blur: false,
  name: 'Please login',
  role: 'none',
  image: '',
  loggedIn: false,
  landing: false,
  logoutEmployee: () => {}
};
