function BinarySearchTree(compareFun) {

	// force 'new' behaviour
	var api = {};

	// if no compare function provided then we will asume numerical comparisons
	if (!compareFun || typeof compareFun !== 'function') {
		var compareFun = function nativeCompare(a, b) {
			return a - b;
		}
	}

	var root = null;
	var node_count = 0;
	var parent_node = null;

	function Node(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}

	function add_value(node, value) {
		try {
			var result = compareFun(node.value, value);
		} catch (e) {}
		
		if (result === 0) {
			// already have this value
			node.value = value;
			return true;
		}
		else if (result > 0) {
			// new value is less than this nodes value
			if (node.left === null) {
				node.left = new Node(value);
				node_count++;
				return true;
			}
			else {
				return add_value(node.left, value);
			}
		}
		else if (result < 0) {
			// new value is greater than this nodes value
			if (node.right === null) {
				node.right = new Node(value);
				node_count++;
				return true;
			}
			else {
				return add_value(node.right, value);
			}
		}
		return false;	// error occurred in comparison function
	}

	function find(node, value) {
		if (node === null || node === undefined || value === null || value === undefined) { return false; }
		try {
			var result = compareFun(node.value, value);
		} catch (e) {}

		if (result === 0) {
			return node;
		}
		else if (result > 0) {
			parent_node = node;
			return find(node.left, value);
		}
		else if (result < 0) {
			parent_node = node;
			return find(node.right, value);
		}
		return false;
	}

	function rebalance(node) {
		//fds
	}

	api.add = function add(value) {
		// do not accept null or undefined values
		if (value === null || value === undefined) { return false; }
		// valid value - insert into tree
		// if no root value make this the root
		if (root === null) {
			root = new Node(value);
			node_count = 1;
			return true;
		}
		// we already have a root value
		return add_value(root, value);
		// TODO: rebalance tree once new value added
	}

	api.get = function get(value) {
		var result = find(root, value);
		if (result instanceof Node) {
			return result.value;
		}
		else {
			return false;
		}
	}

	api.min = function min() {
		var current = root;
		while (current.left !== null) {
			current = current.left;
		}
		return current.value;
	}

	api.max = function max() {
		var current = root;
		while (current.right !== null) {
			current = current.right;
		}
		return current.value;
	}

	api.count = function count() {
		return node_count;
	}

	api.remove = function remove(value) {
		var result = find(root, value);
		if (typeof result === Node) {
			// remove somehow
			// ???
			// TODO: rebalance tree once value removed
			rebalance(root);
			return true;
		}
		else {
			return false;
		}
	}

	function find_one_up(node, value) {
		if (node === null || node === undefined || value === null || value === undefined) { return false; }
		try {
			var one_left = (typeof node.left === Node) ? compareFun(node.left.value, value) : false;
			var result = compareFun(node.value, value);
		} catch (e) {}

		if (one_left === 0) {
			return node;
		}
		else if (result > 0) {
			return find_one_up(node.left, value);
		}
		else if (result < 0) {
			return find_one_up(node.right, value);
		}
		return false;
	}

	function next_higher_node(node, current_value) {
		// first test that we don't have a null reference pointer
		if (!node) { return false; }

		if (node.right && node.right > current_value) { // if we have a right node - get the smallest child of right branch
			node = node.right;
			while (node.left) {
				node = node.left;
			}
			return node;
		}
		else {
			// must be the next highest one
			find(root, node.value);
			var temp = parent_node;
			if (compareFun(temp.value, current_value) > 0) {
				return temp;
			}
			else {		// parent is still less than the highest value - go another level higher
				return next_higher_node(temp, current_value);
			}
		}
	}

	api.getInOrder = function getInOrder() {

		// if we have empty tree - return
		if (!root) { return false; }

		// get min value first
		var node = root;
		while (node.left) {
			node = node.left;
		}

		return {
			next: function () {
				var value = node ? node.value : false;
				if (node) {
					node = next_higher_node(node, value);
				}
				return value;
			}
		}
	}

	api.getPreOrder = function getPreOrder() { return false; }

	api.getPostOrder = function getPostOrder() { return false; }

	return api;

}

exports.getBST = function (fun) {
	return new BinarySearchTree(fun);
};