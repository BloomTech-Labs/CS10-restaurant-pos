import React from 'react';
import PropTypes from 'prop-types';

import Clock from '../Clock';
import CurrentUser from '../CurrentUser';

import * as s from './styles';

class Topbar extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <s.Topbar blur={this.props.blur}>
        <Clock />
        <h1>Main Course</h1>
        <s.StyledLink to="/login-employee">(Employee Login)</s.StyledLink>
        <s.StyledLink to="/login">(Admin Login)</s.StyledLink>
        <s.StyledLink to="/register">(Register)</s.StyledLink>
        <s.StyledLink to="/new-employee">(New Employee)</s.StyledLink>
        <s.StyledLink to="/new-restaurant">(New Restaurant)</s.StyledLink>
        <s.StyledLink to="/tables">(Tables)</s.StyledLink>
        <s.StyledLink to="/party">(Party)</s.StyledLink>
        <s.StyledLink to="/servers">(Servers)</s.StyledLink>
        <s.StyledLink to="/settings">(Settings)</s.StyledLink>
        <s.StyledLink to="/logout">(Logout)</s.StyledLink>
        <CurrentUser user={user} />
        {/* <Clock /> */}
      </s.Topbar>
    );
  }
}

Topbar.propTypes = {
  blur: PropTypes.bool,
  user: PropTypes.shape({ name: PropTypes.string })
};

Topbar.defaultProps = {
  blur: false,
  user: { name: 'Please login' }
};

export default Topbar;
