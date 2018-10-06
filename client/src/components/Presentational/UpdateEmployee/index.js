import React from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';

import {
  Button,
  StyledFormik,
  StyledForm,
  StyledField,
  StyledErrorMessage
} from '../../../global-styles/styledComponents';

import * as s from './styles';

class UpdateEmployee extends React.Component {
  state = {
    revealed: false,
    background: localStorage.getItem('themeColor') || '#E30E58'
  };

  resetColor = () => {
    this.setState({
      background: '#E30E58'
    });
  };

  toggleColorPicker = () => {
    this.setState((prev) => ({
      revealed: !prev.revealed
    }));
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };

  render() {
    const { revealed, background } = this.state;
    const { authorized, updateEmployee } = this.props;
    return (
      <React.Fragment>
        <StyledFormik
          initialValues={{
            pin: '',
            pass: '',
            newPass: '',
            confirmNew: '',
            email: '',
            name: '',
            themeColor: ''
          }}
          validate={(values) => {
            const errors = {};
            if (!values.pin) {
              errors.pin = 'Required';
            }
            if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            if (!values.pass) {
              errors.pass = 'Required';
            }
            if (values.newPass && values.newPass !== values.confirmNew) {
              errors.confirmNew = 'Passwords do not match';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              if (background !== localStorage.getItem('themeColor')) {
                localStorage.setItem('themeColor', background);
                await updateEmployee({ ...values, themeColor: background });
                resetForm();
                setSubmitting(false);
              } else {
                await updateEmployee({ ...values });
                resetForm();
                setSubmitting(false);
              }
            } catch (err) {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, isSubmitting }) => (
            <StyledForm updateEmployee>
              <s.CardHalf left>
                <s.Titles>Verify Identity</s.Titles>
                <s.TextBox>
                  Before making any changes to your account, we need to be extra sure!
                </s.TextBox>
                <StyledField
                  type="text"
                  name="pin"
                  placeholder="1234"
                  error={errors.name}
                  minLength="4"
                  maxLength="4"
                  autoComplete="username"
                />
                <StyledErrorMessage name="pin" component="div" />
                <StyledField
                  type="password"
                  name="pass"
                  minLength="8"
                  maxLength="21"
                  placeholder="Password"
                />
              </s.CardHalf>
              <s.CardHalf right>
                <StyledErrorMessage name="pass" component="div" />
                <s.Titles>Edit Desired Fields</s.Titles>
                <StyledField
                  type="password"
                  name="newPass"
                  minLength="8"
                  maxLength="21"
                  placeholder="New Password"
                />
                <StyledErrorMessage name="newPass" component="div" />
                <StyledField
                  type="password"
                  name="confirmNew"
                  minLength="8"
                  maxLength="21"
                  placeholder="Confirm New Password"
                />
                <StyledErrorMessage name="confirmNew" component="div" />
                <StyledField type="text" name="name" placeholder="New Name" />
                <StyledErrorMessage name="name" component="div" />
                <StyledField type="email" name="email" placeholder="New Email" />
                <StyledErrorMessage name="email" component="div" />
                {authorized && (
                  <s.ColorPickerButtons>
                    <Button type="button" onClick={this.toggleColorPicker}>
                      {revealed ? 'Save Color' : 'Pick Color'}
                    </Button>
                    <Button type="button" onClick={this.resetColor}>
                      Reset Color
                    </Button>
                    {revealed ? (
                      <s.ColorPickerBox>
                        <ChromePicker
                          color={background}
                          onChangeComplete={this.handleChangeComplete}
                        />
                      </s.ColorPickerBox>
                    ) : null}
                  </s.ColorPickerButtons>
                )}
                <Button primary dark type="submit" inactive={isSubmitting}>
                  Submit
                </Button>
              </s.CardHalf>
            </StyledForm>
          )}
        </StyledFormik>
      </React.Fragment>
    );
  }
}

UpdateEmployee.propTypes = {
  authorized: PropTypes.bool,
  updateEmployee: PropTypes.func
};

UpdateEmployee.defaultProps = {
  authorized: false,
  updateEmployee: () => {}
};

export default UpdateEmployee;
