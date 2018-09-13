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
  flex-direction: column;
  justify-content: center;
  border-right: 2px solid grey;
  width: 300px;
  padding: 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  width: 100%;
`;
