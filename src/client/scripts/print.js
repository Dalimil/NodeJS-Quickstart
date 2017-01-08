"use strict";

const evenNums = Array(10).fill(0).map((v, i) => i * 2);

console.log("Hi, I am a client-side JS module print.js");

class Dog {
	constructor(name) {
		this.name = name;
	}

	bark() {
		return `Wah wah, I am ${this.name}`;
	}
}

export {
	evenNums as evenNumbers,
	Dog 
};

/*// Old syntax is fine too: 

module.exports = {
	evenNumbers: evenNums,
	Dog
};
*/
