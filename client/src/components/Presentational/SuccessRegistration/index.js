import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import * as s from './styles';

class SuccessRegistration extends React.PureComponent {
  constructor(props) {
    super(props);

    this.pin = React.createRef();
  }

  copyToClipboard = () => {
    if (document.queryCommandSupported('copy')) {
      this.pin.current.select();
      document.execCommand('copy');

      toast('PIN copied to the clipboard');
    }
  };

  render() {
    const { pin, restaurant } = this.props;
    return (
      <s.Container>
        <s.SubContainer>
          <s.Text>Remember this PIN</s.Text>
          <s.PinContainer onClick={this.copyToClipboard}>{pin}</s.PinContainer>
          <s.Text>You will need it to login!</s.Text>
          {!restaurant.length && (
            <s.Text uponLogin>
              To sign into the service and create your restaurant:
              <s.LinkDiv>
                <Link to="/login">Click Here</Link>
              </s.LinkDiv>
            </s.Text>
          )}
          <textarea style={{ position: 'fixed', left: '10000px' }} ref={this.pin} value={pin} readOnly />
        </s.SubContainer>
      </s.Container>
    );
  }
}

SuccessRegistration.propTypes = {
  pin: PropTypes.string,
  restaurant: PropTypes.string
};

SuccessRegistration.defaultProps = {
  pin: '',
  restaurant: ''
};

const mapStateToProps = (state) => ({
  pin: state.auth.pin,
  restaurant: state.auth.restaurant
});

export default connect(mapStateToProps)(SuccessRegistration);
