import styled from 'styled-components';

import { flexCenterMixin } from '../../../global-styles/mixins';

export const Container = styled.div`
  ${flexCenterMixin}
  position: absolute;
  height: 60px;
  width: 40px;
  left: 40px;
  bottom: 30px;

  &:hover {
    cursor: pointer;
  }
`;

export const DeletePartyButton = styled.div`
  width: 30px;
  height: 30px;
`;
