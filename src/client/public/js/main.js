"use strict";

const { evenNumbers } = require("./print");

evenNumbers.forEach((x, i) => {
	if (i < 5) {
		console.log(i * 3);
	}
});

console.log("Main module loaded.");
