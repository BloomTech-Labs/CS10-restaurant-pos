import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../../global-styles/styledComponents';
import ListBullet from '../ListBullet';

import * as s from './styles';

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.LearnMoreTarget = React.createRef();
  }

  learnMore = () => {
    this.LearnMoreTarget.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest'
    });
  };

  render() {
    return (
      <s.Container>
        <s.Background>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 4041">
            <path
              id="Landing_Bgd_svg"
              d="M-2209-217.652S-2053.2-469.609-1458-577s838.464-682,838.464-682H-2209Z"
              transform="translate(2209 1100)"
            />
          </svg>
        </s.Background>
        <s.LandingContainer className="App">
          <s.SubContainer>
            <s.Info>
              <s.Tagline>
                A POS that will make you <i>want</i> to take orders
              </s.Tagline>
              <s.Buttons>
                <Button dark onClick={this.learnMore}>
                  Learn More
                </Button>
                <Link to="/register">
                  <Button primary>Sign Up</Button>
                </Link>
              </s.Buttons>
            </s.Info>
            <s.Video loop muted autoPlay playsinline>
              <source
                src="https://storage.googleapis.com/main-course-images/paidFloorPlanVideo.mp4"
              />
            </s.Video>
          </s.SubContainer>
          <s.Scroll>
            <s.Block>
              <div>
                <ListBullet /> Keep track of parties and orders intuitively, with a fully
                customizable table layout
              </div>
              <div>
                <ListBullet /> Operate visually by uploading pictures of any item on your menu, and
                even your employees from practically anywhere
              </div>
              <div>
                <ListBullet /> Quickly manage your employees, view their tables and the orders
                they&apos;ve taken
              </div>
              <s.PriceAd>
                <s.Price>50</s.Price>
                <div>a month</div>
              </s.PriceAd>
            </s.Block>
          </s.Scroll>
          <s.LearnMoreTarget innerRef={this.LearnMoreTarget} />
        </s.LandingContainer>
      </s.Container>
    );
  }
}

export default Landing;
