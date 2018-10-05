import React from 'react';
import { connect } from 'react-redux';
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
    return (
      <s.Container>
        <s.SubContainer>
          <s.Text>Remember this PIN</s.Text>
          <s.PinContainer onClick={this.copyToClipboard}>
            {this.props.pin}
          </s.PinContainer>
          <s.Text>You will need it to login!</s.Text>
          <textarea
            style={{ position: 'fixed', left: '10000px' }}
            ref={this.pin}
            value={this.props.pin}
          />
        </s.SubContainer>
      </s.Container>
    );
  }
}

SuccessRegistration.propTypes = {
  pin: PropTypes.string,
};

SuccessRegistration.defaultProps = {
  pin: '',
};

const mapStateToProps = (state) => ({
  pin: state.auth.pin,
});

export default connect(mapStateToProps)(SuccessRegistration);
