import styled from 'styled-components';

import { flexCenterMixin } from '../../../global-styles/mixins';

export const LandingContainer = styled.div`
  ${flexCenterMixin}
  flex-grow: 2;
`;

export const SubContainer = styled.div`
  position: fixed;
  top: 30%;
  left: 10%;
  min-width: 350px;
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

export const Tagline = styled.div`
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 100px;
  color: ${(props) => props.theme.appPrimary};
`;

export const Buttons = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
`;
