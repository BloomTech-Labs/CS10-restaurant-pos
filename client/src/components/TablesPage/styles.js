import styled from 'styled-components';

import { flexCenterMixin } from '../../global-styles/mixins';

export const Container = styled.div`
  display: flex;
  flex-grow: 2;
`;

export const Editor = styled.div`
  ${flexCenterMixin}
  min-height: 100%;
  flex-grow: 6;
`;

export const Menu = styled.div`
  ${flexCenterMixin}
  border: 1px solid green;
  width: 300px;
  background: black;
  min-height: 100%;
`;
