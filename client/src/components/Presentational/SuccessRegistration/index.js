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
        <div>Remember this PIN: <span onClick={this.copyToClipboard}>{this.props.pin}</span></div>
        <div>You will need it to login!</div>
        <textarea
          style={{ position: 'relative', zIndex: '-1' }}
          ref={this.pin}
          value={this.props.pin}
        />
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
