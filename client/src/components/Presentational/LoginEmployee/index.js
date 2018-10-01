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

const LoginEmployee = props => (
  <React.Fragment>
    <StyledFormik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.pin) {
          errors.pin = 'Required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        props.loginEmployee(values);
        setSubmitting(false); // TODO: set this to false upon success or error
      }}
    >
      {({ errors, isSubmitting }) => (
        <s.Container>
          <h1>Employee Login</h1>
          <StyledForm>
            <StyledField
              type="number"
              name="pin"
              placeholder="1234"
              error={errors.pin}
              minLength="4"
              maxLength="4"
              autoComplete="username"
            />
            <StyledErrorMessage name="pin" component="div" />
            <StyledField
              type="password"
              name="pass"
              autoComplete="current-password"
              placeholder="********"
            />
            <StyledErrorMessage name="pass" component="div" />
            <Button primary dark type="submit" inactive={isSubmitting}>
              Submit
            </Button>
          </StyledForm>
        </s.Container>
      )}
    </StyledFormik>
  </React.Fragment>
);

LoginEmployee.propTypes = {
  loginEmployee: PropTypes.func,
};

LoginEmployee.defaultProps = {
  loginEmployee: () => {},
};


export default LoginEmployee;
