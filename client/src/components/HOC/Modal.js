import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { flexCenterMixin } from '../../global-styles/mixins';
// import {} from '../../global-styles/variables';

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

export default function ModalComponent(props) {
  return (
    <Container>
      <Overlay onClick={props.closeModal} />
      <Modal>{props.children}</Modal>
    </Container>
  );
}

ModalComponent.propTypes = {
  closeModal: PropTypes.func,
  children: PropTypes.arrayOf(PropTypes.node)
};

ModalComponent.defaultProps = {
  closeModal: () => {},
  children: [],
};
