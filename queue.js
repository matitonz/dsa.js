function Queue() {

	var exp = {}, datastore = [];

	function is_empty() {
		if (datastore.length === 0) {
			return true;
		}
		else {
			return false;
		}
	}

	exp.enqueue = function (value) {
		if (value !== undefined) {
			datastore.push(value);
			return true;
		}
		else {
			return false;
		}
	};

	exp.dequeue = function () {
		if (is_empty()) {
			return undefined;
		}
		else {
			return datastore.shift();
		}
	};

	exp.peek = function () {
		if (is_empty()) {
			return datastore[0];
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