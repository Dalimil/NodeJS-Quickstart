"use strict";

const { Dog, evenNumbers } = require("./print");

const toby = new Dog("Toby");
toby.bark();

evenNumbers.forEach((x, i) => {
	if (i < 5) {
		console.log(i * 3);
	}
});

console.log("Main module loaded.");
