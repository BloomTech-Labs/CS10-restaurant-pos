import styled from 'styled-components';

import { flexCenterMixin } from '../../../global-styles/mixins';

export const LandingContainer = styled.div`
  ${flexCenterMixin}
  flex-grow: 2;
`;

export const Title = styled.h1`
  position: fixed;
  top: 40px;
  left: 50px;
  display: flex;
  font-size: 3.3rem;
  color: ${(props) => props.theme.appPrimary};

  * {
    margin-right: 10px;
  }
`;

export const Background = styled.div`
  position: fixed;
  z-index: -100;
  width: 100vw;
  top: 0;
  left: 0;
  fill: ${(props) => props.theme.appSecondary};
`;
