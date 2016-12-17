"use strict";

const evens = Array(10).fill(0).map(v => v * 2);

console.log("Hi, I am a client-side JS module print.js");

class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    return `Wah wah, I am ${this.name}`;
  }
}

export evenNumbers as evens;
export Dog;

/*// Old syntax is fine too: 

module.exports = {
	evenNumbers: evens,
	Dog
};
*/
