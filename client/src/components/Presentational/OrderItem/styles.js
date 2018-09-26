import styled from 'styled-components';

import { flexCenterMixin } from '../../../global-styles/mixins';

export const Items = styled.div`
  display: flex;
  align-items: center;
  height: 75px;
  margin: 7px;
  padding: 15px;
`;

export const DeleteButton = styled.div`
  ${flexCenterMixin};
  cursor: pointer;
  background: grey;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
`;
