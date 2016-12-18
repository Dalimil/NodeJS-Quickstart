import React from 'react';
import ReactDOM from 'react-dom';

const App = props => (
  <div>
    The app says: {props.message}
  </div>
);

// Wait for DOM loaded
$(() => {

	ReactDOM.render(
	  <App message="Hello World!" />,
	  document.getElementById("my-react-root")
	);

	console.log('React-demo module is now loaded...');
});
