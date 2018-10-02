import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addItem } from '../../../redux/actions/items';
import CreateItem from '../../Presentational/CreateItem';

// ! Are we using this component?
class SettingsForm extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CreateItem addItem={this.props.addItem} />
      </React.Fragment>
    );
  }
}

SettingsForm.propTypes = {
  addItem: PropTypes.func,
};

SettingsForm.defaultProps = {
  addItem: () => {},
};

export default connect(null, { addItem })(SettingsForm);
