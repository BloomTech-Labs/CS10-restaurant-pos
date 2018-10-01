import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  StyledFormik,
  StyledForm,
  StyledField,
  StyledErrorMessage
} from '../../../global-styles/styledComponents';

import * as s from './styles';

const ChangePassword = props => (
  <React.Fragment>
    <StyledFormik
      initialValues={{ pin: '', oldPassword: '', newPassword: '', confirmNew: '' }}
      validate={values => {
        const errors = {};
        if (!values.pin) {
          errors.pin = 'Required';
        }
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        if (!values.oldPassword) {
          errors.oldPassword = 'Required';
        }
        if (!values.newPassword) {
          errors.newPassword = 'Required';
        } else if (values.newPassword !== values.confirmNew) {
          errors.confirmNew = 'Passwords do not match';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        props.changePassword(values);
        setSubmitting(false); // TODO: set this to false upon success or error
      }}
    >
      {/* // TODO: build categories */}
      {({ errors, isSubmitting }) => (
        <s.Container>
          <h1>Change Password</h1>
          <StyledForm>
            <StyledField
              type="text"
              name="pin"
              placeholder="1234"
              error={errors.name}
              minLength="4"
              maxLength="4"
              autoComplete="username"
            />
            <StyledErrorMessage name="pin" component="div" />
            <StyledField
              type="text"
              name="oldPassword"
              minLength="8"
              maxLength="21"
              placeholder="Old Password"
            />
            <StyledErrorMessage name="oldPassword" component="div" />
            <StyledField
              type="number"
              name="newPassword"
              minLength="8"
              maxLength="21"
              placeholder="New Password"
            />
            <StyledErrorMessage name="newPassword" component="div" />
            <StyledField
              type="number"
              name="confirmNew"
              minLength="8"
              maxLength="21"
              placeholder="Confirm New Password"
            />
            <StyledErrorMessage name="confirmNew" component="div" />
            <Button primary dark type="submit" inactive={isSubmitting}>
              Submit
            </Button>
          </StyledForm>
        </s.Container>
      )}
    </StyledFormik>
  </React.Fragment>
);

ChangePassword.propTypes = {
  changePassword: PropTypes.func,
};

ChangePassword.defaultProps = {
  changePassword: () => {},
};

export default ChangePassword;
