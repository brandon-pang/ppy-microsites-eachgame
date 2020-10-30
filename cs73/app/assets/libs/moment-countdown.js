(function () {
	var countdown, moment, ref, ref1, slice = [].slice;
	countdown = (ref = typeof require === "function" ? require("countdown") : void 0) != null ? ref : this.countdown;
	moment = (ref1 = typeof require === "function" ? require("moment") : void 0) != null ? ref1 : this.moment;
	moment.fn.countdown = function () {
		var args, other;
		other = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
		return countdown.apply(null, [this.toDate(), moment(other).toDate()].concat(slice.call(args)))
	}
}).call(this);