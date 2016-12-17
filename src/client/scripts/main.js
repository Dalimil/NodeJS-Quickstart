"use strict";

const { Dog, evenNumbers: evens } = require("./print");

const toby = new Dog("Toby");
toby.bark();

const result = evens.reduce((accum, val) => {
	return (val < 10) ? `${accum}--${val * 3}` : accum;
}, ">");

console.log("Main module loaded.", result);
