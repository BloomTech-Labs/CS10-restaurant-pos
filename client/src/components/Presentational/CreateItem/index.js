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

const CreateItem = (props) => (
  <React.Fragment>
    <StyledFormik
      initialValues={{ name: '', description: '', price: '', category: '' }}
      validate={(values) => {
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
      onSubmit={(values, { setSubmitting, resetForm }) => {
        props.addItem(values);
        resetForm({});
        setSubmitting(false); // TODO: set this to false upon success or error
      }}
    >
      {({ errors, isSubmitting }) => (
        <s.Container>
          <button type="button" onClick={props.openUploadModal}>
            Test Modal
          </button>
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
            <StyledField name="category" component="select">
              <option value="">Choose a category...</option>
              {props.itemCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </StyledField>
            <StyledField type="text" name="category" maxLength="25" placeholder="Entrees" />
            <StyledErrorMessage name="description" component="div" />
            <StyledField type="number" name="price" maxLength="100" placeholder="5.99" />
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
  itemCategories: PropTypes.arrayOf(PropTypes.string),
  addItem: PropTypes.func,
  openUploadModal: PropTypes.func
};

CreateItem.defaultProps = {
  itemCategories: ['default category one, default category two'],
  addItem: () => {},
  openUploadModal: () => {}
};

export default CreateItem;
