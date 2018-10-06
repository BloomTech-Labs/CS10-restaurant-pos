import styled from 'styled-components';

import { flexCenterMixin } from '../../../global-styles/mixins';

export const Container = styled.div`
  ${flexCenterMixin}
  position: absolute;
  height: 60px;
  width: 40px;
  left: 40px;
  top: 30px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const BackButton = styled.div`
  width: 30px;
  height: 30px;
`;
