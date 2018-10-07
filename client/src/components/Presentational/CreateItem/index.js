import React from 'react';
import PropTypes from 'prop-types';

import UploadModal from '../UploadModal';
import {
  Button,
  StyledFormik,
  StyledForm,
  StyledField,
  StyledErrorMessage
} from '../../../global-styles/styledComponents';

import * as s from './styles';

class CreateItem extends React.Component {
  state = {
    images: {},
    uploadModalIsOpen: false
  };

  setImageUrls = (images) => this.setState({ images });

  openUploadModal = () => this.setState({ uploadModalIsOpen: true });

  closeUploadModal = () => this.setState({ uploadModalIsOpen: false });

  render() {
    return (
      <React.Fragment>
        <UploadModal
          open={this.state.uploadModalIsOpen}
          setImageUrls={this.setImageUrls}
          closeUploadModal={this.closeUploadModal}
        />
        <StyledFormik
          initialValues={{ name: '', description: '', price: '', category: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = 'Required';
            }
            // if (!values.description) {
            //   errors.description = 'Required';
            // }
            if (!values.price) {
              errors.price = 'Required';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await this.props.addItem({ ...values, images: this.state.images });
              resetForm();
              setSubmitting(false);
            } catch (err) {
              setSubmitting(false);
            }
          }}
        >
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
                {/* <StyledField
                  type="text"
                  name="description"
                  maxLength="100"
                  placeholder="Delish Nutrish"
                />
                <StyledErrorMessage name="description" component="div" /> */}
                <StyledField style={{ padding: '5px' }} name="category" component="select">
                  <option value="">Choose a category...</option>
                  {this.props.itemCategories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </StyledField>
                <StyledField type="text" name="category" maxLength="25" placeholder="Entrees" />
                <StyledErrorMessage name="category" component="div" />
                <StyledField type="number" name="price" maxLength="100" placeholder="5.99" />
                <StyledErrorMessage name="price" component="div" />
                <Button type="button" onClick={this.openUploadModal}>
                  Upload Image
                </Button>
                <Button primary dark type="submit" inactive={isSubmitting}>
                  Submit
                </Button>
              </StyledForm>
            </s.Container>
          )}
        </StyledFormik>
      </React.Fragment>
    );
  }
}

CreateItem.propTypes = {
  itemCategories: PropTypes.arrayOf(PropTypes.string),
  addItem: PropTypes.func,
};

CreateItem.defaultProps = {
  itemCategories: ['default category one, default category two'],
  addItem: () => {},
};

export default CreateItem;
