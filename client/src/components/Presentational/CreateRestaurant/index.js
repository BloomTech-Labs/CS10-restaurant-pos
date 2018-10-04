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

const CreateRestaurant = props => (
  <React.Fragment>
    <StyledFormik
      initialValues={{ name: '', location: '', billingAddress: '' }}
      validate={values => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Required';
        }
        if (!values.location) {
          errors.location = 'Required';
        }
        if (!values.billingAddress) {
          errors.billingAddress = 'Required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        props.addRestaurant(values);
        setSubmitting(false); // TODO: set this to false upon success or error
      }}
    >
      {({ errors, isSubmitting }) => (
        <s.Container>
          <h1>Add Your Restaurant Info</h1>
          <StyledForm>
            <StyledField
              type="text"
              name="name"
              placeholder="Restaurant Name"
              error={errors.email}
            />
            <StyledErrorMessage name="name" component="div" />
            <StyledField
              placeholder="location"
              type="text"
              name="location"
            />
            <StyledErrorMessage name="location" component="div" />
            <StyledField
              placeholder="billing address"
              type="text"
              name="billingAddress"
            />
            <StyledErrorMessage name="billingAddress" component="div" />
            <Button primary dark type="submit" inactive={isSubmitting}>
              Submit
            </Button>
          </StyledForm>
        </s.Container>
      )}
    </StyledFormik>
  </React.Fragment>
);

CreateRestaurant.propTypes = {
  addRestaurant: PropTypes.func,
};

CreateRestaurant.defaultProps = {
  addRestaurant: () => {},
};


export default CreateRestaurant;
