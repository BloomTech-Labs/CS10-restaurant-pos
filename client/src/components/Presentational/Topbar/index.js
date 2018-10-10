import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../Logo';
import Clock from '../Clock';
import Date from '../Date';
import CurrentUser from '../CurrentUser';

import * as s from './styles';

export default function Topbar(props) {
  const { name, logoutEmployee, role, loggedIn, landing, image } = props;

  if (landing && !loggedIn) {
    return (
      <s.Topbar>
        <s.LandingTitle><Logo width="45" />Main Course</s.LandingTitle>
        <s.Tab>
          <s.StyledLink to="/login">Login</s.StyledLink>
          <s.StyledLink to="/register">Register</s.StyledLink>
        </s.Tab>
      </s.Topbar>
    );
  }

  if (landing && loggedIn) {
    return (
      <s.Topbar>
        <s.LandingTitle><Logo width="45" />Main Course</s.LandingTitle>
        <s.Tab>
          <s.StyledLink to="/tables">Proceed To Restaurant</s.StyledLink>
        </s.Tab>
      </s.Topbar>
    );
  }

  return (
    <s.Topbar blur={props.blur}>
      <s.TimeDisplay>
        <Clock />
        <Date />
      </s.TimeDisplay>
      <s.Title>
        <s.StyledLink to="/"> &mdash; Main Course &mdash; </s.StyledLink>
      </s.Title>
      <s.SubContainer visible={loggedIn}>
        <s.SwitchUser onClick={logoutEmployee}>Switch User</s.SwitchUser>
        <CurrentUser name={name} role={role} image={image} />
      </s.SubContainer>
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
