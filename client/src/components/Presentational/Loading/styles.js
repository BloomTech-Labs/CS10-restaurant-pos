import styled, { keyframes } from 'styled-components';

import { containerMixin, flexCenterMixin } from '../../../global-styles/mixins';
import { MainContainer } from '../../../global-styles/styledComponents';

export const Container = styled(MainContainer)`
  ${containerMixin};
  ${flexCenterMixin};
`;

export const Wave = styled.div`
  position: relative;
  text-align: center;
  margin-bottom: ${(props) => props.theme.topBarHeight}px;
`;

export const staggeredWave = keyframes`
  0%,
  60%,
  100% {
    transform: initial;
  }

  30% {
    transform: translateY(-15px);
  }
`;

export const Dot = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 10px;
  background: ${(props) => props.theme.appSecondary};
  animation: ${staggeredWave} 1.2s ease-in-out infinite;

  &:nth-child(2) {
    animation-delay: -1.1s;
  }

  &:nth-child(3) {
    animation-delay: -0.9s;
  }
`;
