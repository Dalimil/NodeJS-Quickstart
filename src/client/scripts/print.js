"use strict";

const evens = Array(10).fill(0).map(v => v * 2);

console.log("Hi, I am a client-side JS module print.js");

module.exports = {
	evenNumbers: evens
};

