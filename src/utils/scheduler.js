"use strict";

function OneOffTask(task) {
	this.task = task;

	this.cancel = () => clearTimeout(task);
}

function RepeatedTask(task) {
	this.task = task;

	this.cancel = () => clearInterval(task);
}


exports.scheduleOnce = (timeout, fn) => {
	let task = setTimeout(fn, timeout);
	return new OneOffTask(task);
};

exports.schedule = (repeatTime, fn) => {
	let task = setInterval(fn, repeatTime);
	return new RepeatedTask(task);
};
