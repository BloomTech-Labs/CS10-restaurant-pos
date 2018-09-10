import React from 'react';
import { connect } from 'react-redux';
// import { setId } from '../Redux/actions/index';

import Login from '../Login';

export default (ComposedComponent) => {
  class RequireAuthentication extends React.Component {
    // componentWillMount() {
    //   if (!sessionStorage.getItem('id')) this.props.history.push('/login');
    //   else this.props.setId(sessionStorage.getItem('id'));
    // }

    render() {
      return (
        <div>
          {sessionStorage.getItem('id') ? (
            <ComposedComponent {...this.props} />
          ) : (
            <Login />
          )}
        </div>
      );
    }
  }

  return connect(
    null
    // { setId }
  )(RequireAuthentication);
};
