function OneOffTask(task) {
	this.task = task;

	this.cancel = function() {
		clearTimeout(task);
	};
}

function RepeatedTask(task) {
	this.task = task;

	this.cancel = function() {
		clearInterval(task);
	};
}


exports.scheduleOnce = function(timeout, fn) {
	var task = setTimeout(fn, timeout);
	return new OneOffTask(task);
}

exports.schedule = function(repeatTime, fn) {
	var task = setInterval(fn, repeatTime);
	return new RepeatedTask(task);
}
