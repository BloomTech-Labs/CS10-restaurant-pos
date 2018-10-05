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

// This component is not being used but could be implemented later

const RestaurantInfo = props => (
  <React.Fragment>
    <StyledFormik
      initialValues={{ name: '', email: '', address: '', billing: '' }}
      validate={values => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Required';
        }
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        if (!values.address) {
          errors.address = 'Required';
        }
        if (!values.billing) {
          errors.billing = 'Required';
        }

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await props.changeRestaurantInfo(values);
          setSubmitting(false);
        } catch (err) {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, isSubmitting }) => (
        <s.Container>
          <h1>Edit Restaurant Info</h1>
          <StyledForm>
            <StyledField
              type="text"
              name="name"
              placeholder="John Smith"
              error={errors.name}
              maxLength="50"
              autoComplete="name"
            />
            <StyledErrorMessage name="name" component="div" />
            <StyledField
              type="email"
              name="email"
              placeholder="delish@nutrish.com"
              error={errors.email}
              maxLength="30"
              autoComplete="username"
            />
            <StyledErrorMessage name="email" component="div" />
            <StyledField
              type="text"
              name="address"
              autoComplete="address"
              maxLength="100"
              placeholder="Address"
            />
            <StyledErrorMessage name="address" component="div" />
            <StyledField
              type="text"
              name="billing"
              autoComplete="billing"
              maxLength="100"
              placeholder="Billing Address"
            />
            <StyledErrorMessage name="billing" component="div" />
            <Button primary dark type="submit" inactive={isSubmitting}>
              Submit
            </Button>
          </StyledForm>
        </s.Container>
      )}
    </StyledFormik>
  </React.Fragment>
);

RestaurantInfo.propTypes = {
  changeRestaurantInfo: PropTypes.func,
};

RestaurantInfo.defaultProps = {
  changeRestaurantInfo: () => {},
};

export default RestaurantInfo;
