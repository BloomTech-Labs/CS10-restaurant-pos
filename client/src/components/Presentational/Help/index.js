import React from 'react';
import { toast } from 'react-toastify';

import * as s from './styles';

class Help extends React.PureComponent {
  constructor(props) {
    super(props);

    this.supportEmail = React.createRef();
  }

  copyToClipboard = () => {
    if (document.queryCommandSupported('copy')) {
      this.supportEmail.current.select();

      document.execCommand('copy');

      toast('Support email copied to the clipboard');
    }
  };

  render() {
    return (
      <s.Container>
        For more information, contact{' '}
        <s.Email onClick={this.copyToClipboard}>help@maincourse.app</s.Email>
        <textarea
          ref={this.supportEmail}
          value="help@maincourse.app"
          style={{ position: 'relative', zIndex: '-1' }}
        />
      </s.Container>
    );
  }
}

export default Help;
