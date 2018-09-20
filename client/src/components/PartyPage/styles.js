import styled from 'styled-components';

import { modalBlur, containerMixin } from '../../global-styles/mixins';

export const Container = styled.div`
  border: 2px solid blue;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  width: 100%;
  ${(props) => props.modalOpen && modalBlur};
`;

export const Food = styled.div`
  ${containerMixin}
  width: 100%;
`;

export const OrderButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

// export const Title = styled.div`
// `;

export const Order = styled.div`
  display: flex;
  flex-direction: column;
  height: 40%;
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 18px;
`;
