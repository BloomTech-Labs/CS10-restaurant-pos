import styled from 'styled-components';

import { flexCenterMixin } from '../../../global-styles/mixins';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${props => props.theme.appTertiary};
  color: ${props => props.theme.textColorDark};
  padding: 0 35px;
`;

export const Scroll = styled.div`
  display: inline-block;
  width: 300px;
  height: 60%;
  overflow-y: scroll;
`;

export const Checkout = styled.div`
  ${flexCenterMixin};
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 40%;
`;

export const ButtonContainer = styled.div`
  ${flexCenterMixin};
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 50%;
`;
