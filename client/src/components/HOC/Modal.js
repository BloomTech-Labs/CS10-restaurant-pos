import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { closeModal } from '../../redux/actions/modal';
import { flexCenterMixin } from '../../global-styles/mixins';

const Container = styled.div`
  ${flexCenterMixin};
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  height: 100vh;
  width: 100vw;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  height: 100%;
  width: 100%;
`;

// TODO: Make percents match max- width/height
const Modal = styled.div`
  background: green;
  ${flexCenterMixin};
  position: fixed;
  top: calc(50% - (66% / 2));
  z-index: 20;
  max-width: 275px;
  width: 35%;
  max-height: 315px;
  height: 66%;
`;

class ModalComponent extends React.Component {
  close = () => this.props.closeSplitModal || this.props.closeModal;

  render() {
    return (
      <Container>
        <Overlay onClick={this.close()} />
        <Modal>
          <div onClick={this.close()}>x</div>
          {this.props.children}
        </Modal>
      </Container>
    );
  }
}

ModalComponent.propTypes = {
  closeModal: PropTypes.func,
  closeSplitModal: PropTypes.oneOf([undefined, PropTypes.func]),
  children: PropTypes.arrayOf(PropTypes.node)
};

ModalComponent.defaultProps = {
  closeModal: () => {},
  closeSplitModal: undefined,
  children: []
};

export default connect(
  null,
  { closeModal }
)(ModalComponent);
