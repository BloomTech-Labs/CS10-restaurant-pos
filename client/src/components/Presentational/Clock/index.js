import React from 'react';

import * as s from './styles';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <s.Clock>{this.state.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</s.Clock>
    );
  }
}

export default Clock;
