import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import { setId } from '../Redux/actions/index';

export default (ComposedComponent) => {
  class RequirePriv extends React.Component {
    render() {
      const { admin, manager } = this.props;
      return (
        <React.Fragment>
          {admin || manager ? (
            <ComposedComponent {...this.props} />
          ) : (
            <Redirect to="/tables" />
          )}
        </React.Fragment>
      );
    }
  }

  const mapStateToProps = (state) => ({
    role: state.auth.role,
  });

  return connect(
    mapStateToProps
    // { setId }
  )(RequirePriv);
};
