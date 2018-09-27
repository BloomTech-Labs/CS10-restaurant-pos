import React from 'react';
import PropTypes from 'prop-types';

import CheckoutModalMain from '../CheckoutModalMain';
import CheckoutModalSplit from '../CheckoutModalSplit';

class CheckoutModal extends React.Component {
  state = {
    showStripe: false
  };

  componentDidUpdate(prev) {
    if (
      this.props.modalIsOpen !== prev.modalIsOpen
      || this.props.splitModalIsOpen !== prev.splitModalIsOpen
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ showStripe: false });
    }
  }

  toggleCheckout = () => {
    this.setState((prev) => ({
      showStripe: !prev.showStripe
    }));
  };

  checkoutSplitOrder = () => {
    this.toggleCheckout();
  };

  render() {
    const {
      modalIsOpen,
      tables,
      location,
      setTotal,
      sendPayment,
      partyId,
      order,
      splitOrder,
      openSplitModal,
      closeSplitModal,
      toggleSplitCheckItem,
      splitModalIsOpen
    } = this.props;

    return (
      <React.Fragment>
        <CheckoutModalMain
          toggleCheckout={this.toggleCheckout}
          showStripe={this.state.showStripe}
          openSplitModal={openSplitModal}
          setTotal={setTotal}
          toggleSplitCheckItem={toggleSplitCheckItem}
          sendPayment={sendPayment}
          modalIsOpen={modalIsOpen}
          partyId={partyId}
          order={order}
          splitOrder={splitOrder}
          tables={tables}
          location={location}
        />
        <CheckoutModalSplit
          checkoutSplitOrder={this.checkoutSplitOrder}
          showStripe={this.state.showStripe}
          closeSplitModal={closeSplitModal}
          sendPayment={sendPayment}
          splitModalIsOpen={splitModalIsOpen}
          partyId={partyId}
          splitOrder={splitOrder}
        />
      </React.Fragment>
    );
  }
}

const locationType = PropTypes.shape({
  country: PropTypes.string,
  state: PropTypes.string
});

CheckoutModal.propTypes = {
  openSplitModal: PropTypes.func,
  setTotal: PropTypes.func,
  toggleSplitCheckItem: PropTypes.func,
  closeSplitModal: PropTypes.func,
  sendPayment: PropTypes.func,
  modalIsOpen: PropTypes.bool,
  splitModalIsOpen: PropTypes.bool,
  partyId: PropTypes.string,
  order: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  splitOrder: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  tables: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of the objects,
  location: locationType
};

CheckoutModal.defaultProps = {
  openSplitModal: () => {},
  setTotal: () => {},
  toggleSplitCheckItem: () => {},
  closeSplitModal: () => {},
  sendPayment: () => {},
  modalIsOpen: false,
  splitModalIsOpen: false,
  partyId: 'defaultpartyid',
  order: [],
  splitOrder: [],
  tables: [{ number: 4 }],
  location: { country: 'US', state: 'CA' }
};

export default CheckoutModal;
