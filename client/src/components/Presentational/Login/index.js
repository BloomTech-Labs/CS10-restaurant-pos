import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Button,
  StyledFormik,
  StyledForm,
  StyledField,
  StyledErrorMessage
} from '../../../global-styles/styledComponents';

import * as s from './styles';

const Login = props => (
  <React.Fragment>
    <StyledFormik
      initialValues={{ email: '', pass: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await props.login(values);
          setSubmitting(false);
        } catch (err) {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, isSubmitting }) => (
        <s.Container>
          <h1>Login to your Restaurant</h1>
          <StyledForm>
            <StyledField
              type="email"
              name="email"
              placeholder="delish@nutrish.com"
              error={errors.email}
              autoComplete="username"
            />
            <StyledErrorMessage name="email" component="div" />
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
          <Link to="/register">Dont have an account? Sign Up here</Link>
        </s.Container>
      )}
    </StyledFormik>
  </React.Fragment>
);

Login.propTypes = {
  login: PropTypes.func
};

Login.defaultProps = {
  login: () => {}
};

export default Login;
