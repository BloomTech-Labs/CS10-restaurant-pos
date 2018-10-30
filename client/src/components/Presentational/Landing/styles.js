import styled from 'styled-components';

import { Boxes } from '../../../global-styles/styledComponents';
import { flexCenterMixin } from '../../../global-styles/mixins';

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const LandingContainer = styled.div`
  flex-grow: 2;
`;

export const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 7% 10%;

  @media (max-width: 1500px) {
    flex-direction: column;
    padding: 100px 0 0 0;
  }

  @media (max-width: 700px) {
    padding: 100px 20px 20px 20px;
  }
`;

export const Background = styled.div`
  position: fixed;
  z-index: -100;
  width: calc(2300px - (1vw * 20));
  top: 0;
  left: 0;
  fill: ${(props) => props.theme.appSecondary};
`;

export const Tagline = styled.div`
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 80px;
  color: ${(props) => props.theme.appPrimary};

  @media (max-width: 1500px) {
    margin-bottom: 50px;
  }
`;

export const Buttons = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
`;

export const Video = styled.video`
  box-shadow: ${(props) => props.theme.boxShadow};
  width: 600px;
  height: 382px;
  background: #fdfdfd;

  @media (max-width: 1500px) {
    margin-top: 50px;
  }

  @media (max-width: 650px) {
    width: 100%;
    height: auto;
  }
`;

export const Info = styled.div`
  min-width: 350px;
`;

export const Scroll = styled.div`
  ${flexCenterMixin};
  height: 1000px;
  width: 100%;
`;

export const LearnMoreTarget = styled.div`
  height: 1px;
`;

export const Block = styled(Boxes)`
  ${flexCenterMixin};
  align-items: flex-start;
  justify-content: space-between;
  width: 50%;
  height: 400px;
  padding: 50px;

  &:hover {
    transform: none;
  }

  * {
    ${flexCenterMixin};
    margin-right: 8px;
  }

  @media (max-width: 1200px) {
    height: 500px;
  }

  @media (max-width: 800px) {
    width: 90%;
    padding: 50px 20px;
  }
`;

export const PriceAd = styled.div`
  ${flexCenterMixin};
  flex-direction: column;
  padding: 5px;
  height: 150px;
  width: 150px;
  border: 1px solid grey;
  border-radius: 18px;
  align-self: center;
`;

export const Price = styled.div`
  ${flexCenterMixin};
  margin: 0;
  font-size: 4.5rem;

  &::before {
    content: '$';
  }

  &::after {
    content: '.00';
  }

  &::before,
  &::after {
    font-size: 2.5rem;
  }
`;
