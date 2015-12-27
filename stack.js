function Stack() {

	var exp = {}, datastore = [];

	function is_empty() {
		if (data.length === 0) {
			return true;
		}
		else {
			return false;
		}
	}

	exp.push = function (value) {
		if (is_empty()) {
			return false;
		}
		else {
			datastore.push(value);
			return true;
		}
	};

	exp.pop = function () {
		if (data.length !== 0) {
			return data.pop();
		}
		else {
			return undefined;
		}
	};

	exp.peek = function () {
		if (is_empty()) {
			return undefined;
		}
		else {
			return data[data.length - 1];
		}
	};

	exp.empty = is_empty;

	return exp;
}
