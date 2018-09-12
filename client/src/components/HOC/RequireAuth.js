import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import { setId } from '../Redux/actions/index';

export default (ComposedComponent) => {
  class RequireAuthentication extends React.Component {
    render() {
      return (
        <React.Fragment>
          {this.props.jwt ? (
            <ComposedComponent {...this.props} />
          ) : (
            <Redirect to="/login" />
          )}
        </React.Fragment>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      jwt: state.auth.jwt,
    };
  };

  return connect(
    mapStateToProps
    // { setId }
  )(RequireAuthentication);
};
