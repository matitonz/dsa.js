function LinkedList(compareFun) {

	api = {};

	var root = null;

	function Node(value) {
		this.value = value;
		this.child = null;
	}

	if (!compareFun || typeof compareFun != 'function') {
		var compareFun = function (a, b) {
			return a - b;
		};
	}

	function find_node_before(node, value) {
		if (!node.child) {
			return null;
		}
		else {
			var comp = compareFun(node.child.value, value);
			if (comp === 0) {
				return node;
			}
			else if (comp < 0) {
				return find_node_before(node.child, value);
			}
			// fall through - not found
			return null
		}
	}

	function find_place(node, value) {
		if (!node.child) {
			return node;
		}
		var comp = compareFun(node.child.value, value);
		if (comp === 0 || comp > 0) {
			return node;
		}
		else {
			return find_place(node.child, value);
		}
	}

	function find_and_insert(node, value) {
		if (node.child === null) {
			node.child = new Node(value);
			return true;
		}
		var comp = compareFun(node.child.value, value);
		if (comp === 0 || comp > 0) {
			var new_node = new Node(value);
			new_node.child = node.child;
			node.child = new_node;
			return true;
		}
		else {
			find_and_insert(node.child, value);
		}
	}

	api.add = function add(value) {
		if (value !== undefined) {
			var new_node = new Node(value);
			if (root === null) {
				root = new_node;
				return true;
			}
			else {
				if (compareFun(root.value, value) > 0) {	// value to insert is less than root value - new root value
					var temp = root;
					new_node.child = temp;
					root = new_node;
					return true;
				}
				else {
					return find_and_insert(root, value);
				}
			}
		}
	}

	api.remove = function remove(value) {
		if (root === null) {
			return false;		// no list, no deal
		}
		else if (compareFun(root.value, value) === 0) {
			var temp = root.value;		// remove root value
			root = root.child;
			return temp;
		}
		else {
			var before = find_node_before(root.child, value);
			if (before) {								// we found a match
				var temp = before.child.value;
				before.child = before.child.child;		// point to node after removal
				return temp;
			}
			return false;
		}
	}

	function find(node, value) {
		if (!node) {
			return false;
		}
		var comp = compareFun(node.value, value);
		if (comp === 0) {
			return node;
		}
		if (comp < 0) {		// keep going deeper
			return find(node.child, value);
		}
		return false;		// not to be found
	}

	api.get = function get(value) {
		if (!root) { return false; }
		if (compareFun(root.value, value) === 0) {
			return root.value;
		}
		else {
			var node = find(root, value);
			return node ? node.value : false;
		}
	}

	api.inOrder = function inOrder() {
		node = root;
		while (node) {
			// console.log(JSON.stringify(node));
			console.log(node.value);
			node = node.child;
		}
	}

	return api;
}

exports.getLinkedList = function () {
	return new LinkedList();
};