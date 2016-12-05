"use strict";

var evens = Array(10).fill(0).map(function (v) {
  return v * 2;
});
var nums = evens.map(function (v, i) {
  return v + i;
});

console.log("Welcome to your web application's JavaScript!");
console.log(evens, nums);