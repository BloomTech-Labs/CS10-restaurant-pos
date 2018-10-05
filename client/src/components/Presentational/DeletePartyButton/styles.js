import styled from 'styled-components';

import { flexCenterMixin } from '../../../global-styles/mixins';

export const Container = styled.div`
  ${flexCenterMixin}
  position: absolute;
  height: 60px;
  width: 40px;
  left: 40px;
  bottom: 30px;
  stroke: #707070;
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    stroke: ${(props) => props.theme.deleteColor};
  }
`;

export const DeletePartyButton = styled.div`
  width: 30px;
  height: 30px;
`;
