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
  ${props => ((props.isOpen || props.isSplitOpen) ? 'display: flex' : 'display: none')};
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
  background: ${props => props.theme.appTertiary};
  color: ${props => props.theme.textColorDark};
  ${flexCenterMixin};
  position: fixed;
  flex-direction: column;
  justify-content: space-evenly;
  top: calc(50% - (66% / 2));
  z-index: 20;
  max-width: 675px;
  width: 35%;
  max-height: 715px;
  height: 66%;
  border-radius: 25px;
  box-shadow: ${props => props.theme.boxShadow};
  padding: 40px;
`;

class ModalComponent extends React.Component {
  close = () => this.props.closeSplitModal || this.props.closeModal;

  render() {
    return (
      <Container isOpen={this.props.isOpen} isSplitOpen={this.props.isSplitOpen}>
        <Overlay onClick={this.close()} />
        <Modal>
          <div
            style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }}
            onClick={this.close()}
          >
            x
          </div>
          {this.props.children}
        </Modal>
      </Container>
    );
  }
}

ModalComponent.propTypes = {
  closeModal: PropTypes.func,
  closeSplitModal: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.arrayOf(PropTypes.node),
  isOpen: PropTypes.bool,
  isSplitOpen: PropTypes.bool,
};

ModalComponent.defaultProps = {
  closeModal: () => {},
  closeSplitModal: undefined,
  children: [],
  isOpen: false,
  isSplitOpen: false,
};

export default connect(
  null,
  { closeModal }
)(ModalComponent);
