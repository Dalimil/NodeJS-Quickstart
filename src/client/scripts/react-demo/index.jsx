"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './Timer'

// Single element
const element = <h1>Hello, world</h1>;
console.log(element, typeof element); // object

// Stateless Functional Component
const SimpleComponent = props => (
  <div>
    The app says: {props.message}
  </div>
);

// Full Component 
class App extends React.Component {

  render() {
    return (
    	<div>
    		<strong>Theme: {this.props.theme}</strong>
    		<Timer /> {/* I imported Timer from my own module */}
    		{this.props.messages.map(m => {
    			return <SimpleComponent message={m} />;
    		})}
    	</div>
    );
  }
}


// Wait for DOM loaded
$(() => {

	const appMessages = ["Hello World!", "Welcome", "3rd message"];
	ReactDOM.render(
	  <App theme="blue" messages={appMessages} />,
	  document.getElementById("my-react-root")
	);

	console.log('React-demo module is now loaded...');
});
