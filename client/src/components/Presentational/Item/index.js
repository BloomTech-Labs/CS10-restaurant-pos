import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

class Item extends React.Component {
  state = {
    showDropdown: false
  };

  toggleDropDown = (e) => {
    if (e) e.stopPropagation();

    this.setState((prev) => ({
      showDropdown: !prev.showDropdown
    }));
  };

  deleteItem = (e) => {
    e.stopPropagation();
    this.props
      .deleteItem(this.props.item._id)
      .then(() => {
        this.props.getItems();
      })
      .catch((err) => console.error(err));
    this.toggleDropDown();
  };

  render() {
    const { authed, item, menu } = this.props;
    const imageToDisplay = item.images
      ? item.images.medium
      : 'https://minimalistbaker.com/wp-content/uploads/2016/05/AMAZING-EASY-Quinoa-Taco-22Meat22-thats-crispy-flavorful-and-protein-packed-9-ingredients-SO-EASY-healthy-vegan-glutenfree-quinoa-tacos-mexican-recipe-768x1128.jpg';

    return (
      <React.Fragment>
        <s.ItemBoxes
          key={item._id}
          onClick={() => this.props.addItemToOrder(item)}
          noHover={this.state.showDropdown}
        >
          <s.ItemPic>
            <img src={imageToDisplay} alt="menu item" />
          </s.ItemPic>
          <s.Item>
            <s.ItemTitle>{item.name}</s.ItemTitle>
            <s.PriceContainer>
              <s.ItemPrice>{item.price.toFixed(2)}</s.ItemPrice>
            </s.PriceContainer>
          </s.Item>
          {menu && authed ? (
            <React.Fragment>
              <s.DropDownDots onClick={this.toggleDropDown}>
                <div />
                <div />
                <div />
              </s.DropDownDots>
              <s.DropDownDisplay show={this.state.showDropdown}>
                <s.Option onClick={this.deleteItem}>Remove Item</s.Option>
              </s.DropDownDisplay>
            </React.Fragment>
          ) : null}
        </s.ItemBoxes>
        <s.Overlay onClick={this.toggleDropDown} show={this.state.showDropdown} />
      </React.Fragment>
    );
  }
}

Item.propTypes = {
  authed: PropTypes.bool,
  menu: PropTypes.bool,
  item: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    _id: PropTypes.string
  }),
  addItemToOrder: PropTypes.func,
  deleteItem: PropTypes.func,
  getItems: PropTypes.func
};

Item.defaultProps = {
  authed: false,
  menu: false,
  item: {
    name: 'Default Item',
    price: '9.99',
    _id: 'defaultId'
  },
  addItemToOrder: () => {},
  deleteItem: () => {},
  getItems: () => {}
};

export default Item;
