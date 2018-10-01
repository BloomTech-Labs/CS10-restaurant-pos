import React from 'react';
import PropTypes from 'prop-types';

import Clock from '../Clock';
import Date from '../Date';
import CurrentUser from '../CurrentUser';

import * as s from './styles';

export default function Topbar(props) {
  const { name, logoutEmployee, role, loggedIn, landing } = props;

  if (landing) {
    return (
      <s.Topbar alignEnd>
        <s.StyledLink to="/login">(Login)</s.StyledLink>
        <s.StyledLink to="/register">(Register)</s.StyledLink>
      </s.Topbar>
    );
  }

  return (
    <s.Topbar blur={props.blur}>
      <div>
        <Clock />
        <Date />
      </div>
      <h1>Main Course</h1>
      {/* <s.StyledLink to="/login-employee">(Employee Login)</s.StyledLink>
      <s.StyledLink to="/login">(Admin Login)</s.StyledLink>
      <s.StyledLink to="/register">(Register)</s.StyledLink>
      <s.StyledLink to="/new-employee">(New Employee)</s.StyledLink> */}
      {/* <s.StyledLink to="/new-restaurant">(New Restaurant)</s.StyledLink> */}
      {/* <s.StyledLink to="/tables">(Tables)</s.StyledLink> */}
      {/* <s.StyledLink to="/party">(Party)</s.StyledLink> */}
      {/* <s.StyledLink to="/servers">(Servers)</s.StyledLink> */}
      {/* <s.StyledLink to="/settings">(Settings)</s.StyledLink> */}
      {/* <button type="button" onClick={logoutEmployee}>(Logout Employee)</button> */}
      {/* {showLogout && <s.StyledLink to="/logout">(Logout)</s.StyledLink>} */}
      {loggedIn ? <CurrentUser name={name} role={role} action={logoutEmployee} /> : <div />}
    </s.Topbar>
  );
}

Topbar.propTypes = {
  blur: PropTypes.bool,
  name: PropTypes.string,
  role: PropTypes.string,
  loggedIn: PropTypes.bool,
  landing: PropTypes.bool,
  logoutEmployee: PropTypes.func,
};

Topbar.defaultProps = {
  blur: false,
  name: 'Please login',
  role: 'none',
  loggedIn: false,
  landing: false,
  logoutEmployee: () => {},
};
