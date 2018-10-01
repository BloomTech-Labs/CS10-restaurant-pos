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

const CreateItem = props => (
  <React.Fragment>
    <StyledFormik
      initialValues={{ name: '', description: '', price: '' }}
      validate={values => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Required';
        }
        if (!values.description) {
          errors.description = 'Required';
        }
        if (!values.price) {
          errors.price = 'Required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        props.addItem(values);
        setSubmitting(false); // TODO: set this to false upon success or error
      }}
    >
      {/* // TODO: build categories */}
      {({ errors, isSubmitting }) => (
        <s.Container>
          <h1>Add New Menu Item</h1>
          <StyledForm>
            <StyledField
              type="text"
              name="name"
              placeholder="Burger"
              error={errors.name}
              maxLength="50"
            />
            <StyledErrorMessage name="name" component="div" />
            <StyledField
              type="text"
              name="description"
              maxLength="100"
              placeholder="Delish Nutrish"
            />
            <StyledErrorMessage name="description" component="div" />
            <StyledField
              type="number"
              name="price"
              maxLength="100"
              placeholder="5.99"
            />
            <StyledErrorMessage name="price" component="div" />
            <Button primary dark type="submit" inactive={isSubmitting}>
              Submit
            </Button>
          </StyledForm>
        </s.Container>
      )}
    </StyledFormik>
  </React.Fragment>
);

CreateItem.propTypes = {
  addItem: PropTypes.func
};

CreateItem.defaultProps = {
  addItem: () => {}
};

export default CreateItem;
