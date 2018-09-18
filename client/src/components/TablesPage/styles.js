import styled from 'styled-components';

import { flexCenterMixin, containerMixin } from '../../global-styles/mixins';

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
  ${containerMixin}
  flex-direction: column;
  width: 100%;
`;
