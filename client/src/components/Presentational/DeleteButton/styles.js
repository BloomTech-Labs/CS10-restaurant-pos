import styled from 'styled-components';

import { flexCenterMixin } from '../../../global-styles/mixins';

export const DeleteButton = styled.div`
  ${flexCenterMixin};
  width: 12px;
  margin-right: 10px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;
