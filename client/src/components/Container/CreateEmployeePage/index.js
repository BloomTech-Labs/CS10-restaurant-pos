import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addEmployee } from '../../../redux/actions/auth';
import CreateEmployee from '../../Presentational/CreateEmployee';

class CreateEmployeePage extends React.PureComponent {
  addEmployee = (info) => {
    this.props.addEmployee(info);
  }

  render() {
    return (
      <CreateEmployee addEmployee={this.addEmployee} />
    );
  }
}


CreateEmployeePage.propTypes = {
  addEmployee: PropTypes.func
};

CreateEmployeePage.defaultProps = {
  addEmployee: () => {}
};

export default connect(
  null,
  { addEmployee }
)(CreateEmployeePage);
