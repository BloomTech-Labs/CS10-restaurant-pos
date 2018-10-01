import React from 'react';
import PropTypes from 'prop-types';

import Clock from '../Clock';
import CurrentUser from '../CurrentUser';

import * as s from './styles';

class Topbar extends React.Component {
  render() {
    const { name, logoutEmployee } = this.props;
    return (
      <s.Topbar blur={this.props.blur}>
        <Clock />
        <h1>Main Course</h1>
        <s.StyledLink to="/login-employee">(Employee Login)</s.StyledLink>
        <s.StyledLink to="/login">(Admin Login)</s.StyledLink>
        <s.StyledLink to="/register">(Register)</s.StyledLink>
        <s.StyledLink to="/new-employee">(New Employee)</s.StyledLink>
        {/* <s.StyledLink to="/new-restaurant">(New Restaurant)</s.StyledLink> */}
        {/* <s.StyledLink to="/tables">(Tables)</s.StyledLink> */}
        {/* <s.StyledLink to="/party">(Party)</s.StyledLink> */}
        {/* <s.StyledLink to="/servers">(Servers)</s.StyledLink> */}
        {/* <s.StyledLink to="/settings">(Settings)</s.StyledLink> */}
        <button type="button" onClick={logoutEmployee}>(Logout Employee)</button>
        <s.StyledLink to="/logout">(Logout)</s.StyledLink>
        <CurrentUser name={name} />
      </s.Topbar>
    );
  }
}

Topbar.propTypes = {
  blur: PropTypes.bool,
  name: PropTypes.string,
  logoutEmployee: PropTypes.func,
};

Topbar.defaultProps = {
  blur: false,
  name: 'Please login',
  logoutEmployee: () => {},
};

export default Topbar;
