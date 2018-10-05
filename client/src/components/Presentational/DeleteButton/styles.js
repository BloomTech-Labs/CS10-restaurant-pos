import styled from 'styled-components';

import { flexCenterMixin } from '../../../global-styles/mixins';

export const DeleteButton = styled.div`
  ${flexCenterMixin};
  width: 12px;
  margin-right: 10px;
  transition: all 0.2s ease-in-out;
  stroke: #707070;

  &:hover {
    cursor: pointer;
    stroke: ${(props) => props.theme.deleteColor};
    transform: scale(1.2);
  }
`;
