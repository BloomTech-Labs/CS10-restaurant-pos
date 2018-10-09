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
      initialValues={{ name: '', location: '' }}
      validate={values => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Required';
        }

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await props.addRestaurant(values);
          setSubmitting(false);
        } catch (err) {
          setSubmitting(false);
        }
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
              type="number"
              name="location"
              placeholder="Zipcode"
              error={errors.location}
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

CreateRestaurant.propTypes = {
  addRestaurant: PropTypes.func
};

CreateRestaurant.defaultProps = {
  addRestaurant: () => {}
};

export default CreateRestaurant;
