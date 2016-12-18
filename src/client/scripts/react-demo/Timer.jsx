"use strict";

import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsElapsed: 0,
      somethingElseUsedInRender: "part-of-state"
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  tick() {
    // setState merges the update into state object
    this.setState((prevState) => ({
      secondsElapsed: prevState.secondsElapsed + 1
    }));
  }

  handleClick() {
    this.setState({
      secondsElapsed: 0
    });
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const resetButton = <button onClick={this.handleClick}>Reset</button>;
    
    return (
      <div>
        Seconds Elapsed: {this.state.secondsElapsed}<br />
        { resetButton }
      </div>
    );
  }
}

export default Timer;

