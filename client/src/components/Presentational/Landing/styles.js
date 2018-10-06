import styled from 'styled-components';

// import { flexCenterMixin } from '../../../global-styles/mixins';

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

export const Title = styled.h1`
  display: flex;
  align-items: center;
  position: fixed;
  top: 40px;
  left: 50px;
  font-size: 3.3rem;
  color: ${(props) => props.theme.appPrimary};

  * {
    margin-right: 10px;
  }

  @media (max-width: 550px) {
    font-size: 2.4rem;
    left: 20px;

    * {
      margin-right: 7px;
    }
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
`;

export const Buttons = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
`;

export const Video = styled.video`
  box-shadow: ${(props) => props.theme.boxShadow};

  @media (max-width: 650px) {
    width: 100%;
  }
`;

export const Info = styled.div`
  min-width: 350px;
`;
