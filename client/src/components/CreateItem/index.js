import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addItem } from '../../redux/actions/items';

import * as s from './styles';

class CreateItem extends React.Component {
  state = {
    name: '',
    description: '',
    price: '',
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addItem(this.state);
  };

  render() {
    return (
      <s.Container>
        Add a New Item
        <s.Form onSubmit={this.handleSubmit}>
          <input
            placeholder="Name"
            type="text"
            onChange={this.handleChange}
            name="name"
            value={this.state.name}
          />
          <input
            placeholder="Description"
            type="text"
            onChange={this.handleChange}
            name="description"
            value={this.state.description}
          />
          <input
            placeholder="Price"
            type="text"
            onChange={this.handleChange}
            name="price"
            value={this.state.price}
          />
          <button type="submit">Submit</button>
        </s.Form>
      </s.Container>
    );
  }
}

CreateItem.propTypes = {
  addItem: PropTypes.func
};

CreateItem.defaultProps = {
  addItem: () => {}
};

export default connect(
  null,
  { addItem }
)(CreateItem);
