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

class Register extends React.Component {
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
          initialValues={{ name: '', email: '', pass: '', confirmPass: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = 'Required';
            }
            if (!values.email) {
              errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            if (!values.pass) {
              errors.pass = 'Required';
            } else if (values.pass !== values.confirmPass) {
              errors.confirmPass = 'Passwords do not match';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await this.props.register({ ...values, images: this.state.images });
              setSubmitting(false);
            } catch (err) {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, isSubmitting }) => (
            <s.Container>
              <h1>Register for our Service</h1>
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
                  type="password"
                  name="pass"
                  autoComplete="new-password"
                  minLength="8"
                  maxLength="21"
                  placeholder="********"
                />
                <StyledErrorMessage name="pass" component="div" />
                <StyledField
                  type="password"
                  name="confirmPass"
                  autoComplete="new-password"
                  minLength="8"
                  maxLength="21"
                  placeholder="********"
                />
                <StyledErrorMessage name="confirmPass" component="div" />
                <Button type="button" onClick={this.openUploadModal}>
                  Upload Profile Image
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

Register.propTypes = {
  register: PropTypes.func
};

Register.defaultProps = {
  register: () => {}
};

export default Register;
