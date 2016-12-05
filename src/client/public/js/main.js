"use strict";

const evens = Array(10).fill(0).map(v => v * 2);
const nums = evens.map((v, i) => v + i);

console.log("Welcome to your web application's JavaScript!");
console.log(evens, nums);
