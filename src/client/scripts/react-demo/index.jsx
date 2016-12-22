"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

// Import routing components
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';

/* Wrapper to avoid activeClassName repetition */
const NavLink = (props) => (
  <Link {...props} activeClassName="active" onlyActiveOnIndex={true} />
);

const Nav = (props) => (
  <div>
    Navigation:&nbsp;
    <NavLink to='/'>Home</NavLink>&nbsp;
    <NavLink to='/about'>About</NavLink>&nbsp;
    <NavLink to='/inbox'>Inbox</NavLink>&nbsp;
    <NavLink to='/inbox/message/Alice/msg-34'>Inbox-Message</NavLink>&nbsp;
  </div>
);

const AppLayout = (props) => (
  <div>
    <Nav />
    {props.children} {/* This will be one Route at a time */}
  </div>
);

const Home = () => <div>--Home Component--</div>;
const About = () => <div>-About Component-</div>;
const NotFound = () => <h1>404.. This page is not found!</h1>;

const Inbox = (props) => (
  <div>
    <h2>Inbox</h2>
    {props.children}
  </div>
);
const InboxHome = () => <div>Inbox Home</div>
const Message = (props) => <div>Msg for {props.params.user}: {props.params.msgId}</div>;


class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory} >
        <Route path="/" component={AppLayout}>
          <IndexRoute component={Home} />
          <Route path="about" component={About} />
          <Route path="inbox" component={Inbox}> {/* Wrapper */}
            <IndexRoute component={InboxHome} />
            <Route path="message/:user/:msgId" component={Message} />
            {/* path could also be just ':id' */}
          </Route>
          <Route path='*' component={NotFound} />
        </Route>
      </Router>
    );
  }
}

// Wait for DOM loaded
$(() => {

  ReactDOM.render(
    <App />,
    document.getElementById("my-react-root")
  );

  console.log('React-demo module is now loaded...');
});

