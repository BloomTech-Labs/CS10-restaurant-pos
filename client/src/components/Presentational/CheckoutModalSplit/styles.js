import styled from 'styled-components';

import { flexCenterMixin } from '../../../global-styles/mixins';

export const OrderButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

export const Order = styled.div`
  display: flex;
  flex-direction: column;
  height: 40%;
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 18px;
`;


export const Checkout = styled.div`
  ${flexCenterMixin};
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 40%;
  padding: 0 20px;
`;
