import styled from 'styled-components';

import { flexCenterMixin } from '../../global-styles/mixins';

export const Container = styled.div`
  display: flex;
  flex-grow: 2;
`;

export const Editor = styled.div`
  ${flexCenterMixin}
  flex-grow: 6;
  padding: 50px;
`;

export const Menu = styled.div`
  display: flex;
  justify-content: center;
  border-right: 2px solid grey;
  width: 300px;
`;
