import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addEmployee } from '../../../redux/actions/auth';
import CreateEmployeePresentational from '../../Presentational/CreateEmployee';

class CreateEmployee extends React.PureComponent {
  addEmployee = (info) => {
    this.props.addEmployee(info, this.props.history.push);
  }

  render() {
    return (
      <CreateEmployeePresentational addEmployee={this.addEmployee} />
    );
  }
}


CreateEmployee.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  addEmployee: PropTypes.func
};

CreateEmployee.defaultProps = {
  history: { push: () => {} },
  addEmployee: () => {}
};

export default connect(
  null,
  { addEmployee }
)(CreateEmployee);
