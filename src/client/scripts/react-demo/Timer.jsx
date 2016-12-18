"use strict";

import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsElapsed: 0,
      somethingElseUsedInRender: "part-of-state"
    };
  }

  tick() {
    // setState merges the update into state object
    this.setState((prevState) => ({
      secondsElapsed: prevState.secondsElapsed + 1
    }));
    // or: this.setState({ secondsElapsed: 42 });
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
    );
  }
}

export default Timer;

