import React from 'react';

import Logo from '../Logo';

import { Button } from '../../../global-styles/styledComponents';

import * as s from './styles';

class Landing extends React.Component {
  render() {
    return (
      <React.Fragment>
        <s.Background>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 4041">
            <path id="Landing_Bgd_svg" d="M-2209-217.652S-2053.2-469.609-1458-577s838.464-682,838.464-682H-2209Z" transform="translate(2209 1100)" />
          </svg>
        </s.Background>
        <s.LandingContainer className="App">
          <s.Title><Logo width="45" />Main Course</s.Title>
          <s.SubContainer>
            <s.Tagline>POS that will make your loins tingle</s.Tagline>
            <s.Buttons>
              <Button dark>Learn More</Button>
              <Button primary>Sign Up</Button>
            </s.Buttons>
          </s.SubContainer>
        </s.LandingContainer>
      </React.Fragment>
    );
  }
}

export default Landing;
