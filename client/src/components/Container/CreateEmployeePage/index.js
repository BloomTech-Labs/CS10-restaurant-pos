import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addEmployee } from '../../../redux/actions/auth';
import CreateEmployee from '../../Presentational/CreateEmployee';

class CreateEmployeePage extends React.PureComponent {
  addEmployee = (info) => {
    this.props.addEmployee(info, this.props.history.push);
  }

  render() {
    return (
      <CreateEmployee addEmployee={this.addEmployee} />
    );
  }
}


CreateEmployeePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  addEmployee: PropTypes.func
};

CreateEmployeePage.defaultProps = {
  history: { push: () => {} },
  addEmployee: () => {}
};

export default connect(
  null,
  { addEmployee }
)(CreateEmployeePage);
