function Deque() {

	var exp = {}, datastore = [];

	function is_empty() {
		if (datastore.length === 0) {
			return true;
		}
		else {
			return false;
		}
	}

	exp.enqueueFront = function (value) {
		if (value !== undefined) {
			datastore.unshift(value);
			return true;
		}
		else {
			return false;
		}
	};

	exp.dequeueFront = function () {
		if (is_empty()) {
			return undefined;
		}
		else {
			return datastore.shift();
		}
	};

	exp.peekFront = function () {
		if (is_empty()) {
			return datastore[0];
		}
		else {
			return undefined;
		}
	};

	exp.equeueBack = function (value) {
		if (value !== undefined) {
			datastore.push(value);
			return true;
		}
		else {
			return false;
		}
	};

	exp.dequeueBack = function () {
		if (is_empty()) {
			return undefined;
		}
		else {
			return datastore.pop();
		}
	};

	exp.peekBack = function () {
		if (is_empty()) {
			return datastore[datastore.length - 1];
		}
		else {
			return undefined;
		}
	};

	exp.toString = function (delimiter) {
		var delimiter = delimiter || '\n';
		return datastore.join(delimiter);
	};
	
	exp.empty = is_empty;

	return exp;
}