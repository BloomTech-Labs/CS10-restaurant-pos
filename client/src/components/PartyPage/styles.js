import styled from 'styled-components';

import { modalBlur } from '../../global-styles/mixins';
import { MainContainer } from '../../global-styles/styledComponents';

export const Container = styled(MainContainer)`
  display: flex;
  flex-direction: row;
  flex-grow: 2;
  width: 100%;
  ${(props) => props.modalOpen && modalBlur};
`;

export const OrderButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.div`
  display: flex;
`;

export const Order = styled.div`
  display: flex;
  flex-direction: column;
  height: 40%;
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 18px;
`;
