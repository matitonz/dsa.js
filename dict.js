function Dictionary() {
	api = {}, internal_map = {};
	api.add = function (name, value) {
		internal_map[name] = value;
	}
	api.get = function (name) {
		if (internal_map[name] !== undefined) {
			return internal_map[name];
		}
		else {
			return null;
		}
	}
	return api;
}

exports.getDictionary = function () {
	return new Dictionary();
};