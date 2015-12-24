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

	function find_parent(root, value) {
		if (root === null || root === undefined || value === null || value === undefined) { return false; }
		if (root instanceof Node) {
			if (root.left === null && root.right === null) {
				return false;
			}
			else if (root.left.value === value || root.right.value === value) {
				return root;
			}
			else if (compareFun(root.value, value) > 0) {
				return find_parent(root.left, value);
			}
			else if (compareFun(root.value, value) < 0) {
				return find_parent(root.right, value);
			}
			return false;
		}
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

	function remove(value) {
		var result = find(root, value);
		if (result instanceof Node) {
			var parent = find_parent(root, value);
			if (result.left === null && result.right === null) {	// 1. no children - lead node
				if (compareFun(parent.value, value) > 0) {
					parent.left = null;
				}
				else {
					parent.right = null;
				}
				return true;
			}
			else if (result.left && result.right === null) {		// 2. right branch is empty - left has nodes
				var child_node = result.left;
				if (parent) {
					if (compareFun(parent.value, value) > 0) {
						parent.left = child_node;
					}
					else {
						parent.right = child_node;
					}
				}
				else if (parent === false) {	// we are removing the root node
					root = child_node;
				}
			}
			else if (result.right && result.left === null) {		// 3. left branch is empty - right has nodes
				var child_node = result.right;
				if (parent) {
					if (compareFun(parent.value, value) > 0) {
						parent.left = child_node;
					}
					else {
						parent.right = child_node;
					}
				}
				else if (parent === false) {
					root = child_node;
				}
			}
			else if (result.left && result.right) {					// 4. both branches have nodes - choose left
				// get highest number of left branch
				var next_node = result.left;
				while (next_node.right !== null) {
					next_node = next_node.right;
				}
				var new_value = next_node.value;
				if (remove(next_node.value)) {	// remove it
					var new_node = new Node(new_value);
					new_node.left = result.left;
					new_node.right = result.right;
					if (parent) {
						if (compareFun(parent.value, value) > 0) {
							parent.left = new_node;
						}
						else {
							parent.right = new_node;
						}
					}
					else if (parent === false) {
						root = new_node;
					}
				}
			}
		}
		else {
			return false;	// could find value
		}
	}

	api.remove = remove;

	function inOrder(node) {
		if (node instanceof Node) {
			inOrder(node.left);
			console.log(node.value);
			inOrder(node.right);
		}
	}

	api.getInOrder = function getInOrder() {
		inOrder(root);
	}

	function preOrder(node) {
		if (node instanceof Node) {
			console.log(node.value);
			preOrder(node.left);
			preOrder(node.right);
		}
	}

	api.getPreOrder = function getPreOrder() {
		preOrder(root);
	}

	function postOrder(node) {
		if (node instanceof Node) {
			postOrder(node.left);
			postOrder(node.right);
			console.log(node.value);
		}
	}

	api.getPostOrder = function getPostOrder() {
		postOrder(root);
	}

	function revOrder(node) {
		if (node instanceof Node) {
			revOrder(node.right);
			console.log(node.value);
			revOrder(node.left);
		}
	}

	api.getRevOrder = function getRevOrder() {
		revOrder(root);
	}
	
	return api;

}

exports.getBST = function (fun) {
	return new BinarySearchTree(fun);
};