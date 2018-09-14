import styled from 'styled-components';

import { flexCenterMixin } from '../../global-styles/mixins';

export const Container = styled.div`
  border: 2px solid blue;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  width: 100%;
`;

export const Title = styled.div`
  ${flexCenterMixin};
  font-size: 2rem;
`;

export const Food = styled.div`
  display: flex;
  flex-grow: 2;
  width: 100%;
`;
