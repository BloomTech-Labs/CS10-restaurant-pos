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
      initialValues={{ name: '', location: '' }}
      validate={values => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Required';
        }
        if (!values.location) {
          errors.location = 'Required';
        }

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await props.updateRestaurant(values);
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
              placeholder="Jimmy's Pizza Joint"
              error={errors.name}
              maxLength="50"
              autoComplete="name"
              minLength="1"
            />
            <StyledErrorMessage name="name" component="div" />
            <StyledField
              type="number"
              name="location"
              placeholder="Zipcode"
              error={errors.location}
              maxLength="5"
            />
            <StyledErrorMessage name="location" component="div" />
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
  updateRestaurant: PropTypes.func,
};

RestaurantInfo.defaultProps = {
  updateRestaurant: () => {},
};

export default RestaurantInfo;
