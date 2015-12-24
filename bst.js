function BinarySearchTree(compareFun) {
	
	// force 'new' behaviour
	if (!this) { this = {}; }

	// if no compare function provided then we will asume numerical comparisons
	if (!compareFun || typeof compareFun !== 'function') {
		var compareFun = function nativeCompare(a, b) {
			return a - b;
		}
	}

	var root = null;

	function Node(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}

	function blah(node, value) {
		var result = compareFun(node.value, value);
		if (result === 0) {
			// already have this value
			node.value = value;
			return true;
		}
		else if (result > 0) {
			// new value is less than this nodes value
			if (node.left === null) {
				node.left = new Node(value);
				return true;
			}
			else {
				blah(node.left, value);
			}
		}
		else if (result < 0) {
			// new value is greater than this nodes value
			if (node.right === null) {
				node.right = new Node(value);
				return true;
			}
			else {
				blah(node.right, vaule);
			}
		}
		return false;
	}

	function find(node, value) {
		if (node === null || node === undefined || value === null || value === undefined) { return false; }
		var result = compareFun(node.value, value);
		if (result === 0) {
			return node;
		}
		else if (result > 0) {
			return find(node.left, value);
		}
		else if (result < 0) {
			return find(node.right, value);
		}
		return false;
	}

	function min(node) {
		if (node.left) {
			return min(node.left);
		}
		else {
			return node;
		}
	}

	function max(node) {
		if (node.right) {
			return max(node.right);
		}
		else {
			return node;
		}
	}

	function rebalance(node) {
		//fds
	}

	this.add = function add(value) {
		// do not accept null or undefined values
		if (value === null || value === undefined) { return false; }
		// valid value - insert into tree
		// if no root value make this the root
		if (root === null) {
			root = new Node(value);
			return true;
		}
		// we already have a root value
		blah(root, value);
	}

	this.getValue = function getValue(value) {
		var result = find(root, value);
		if (result typeof Node) {
			return result.value;
		}
		else {
			return false;
		}
	}

	this.getMin = function min() {
		return min(root);
	}

	this.getMax = function max() {
		return max(root);
	}

	this.remove = function remove(value) {
		var result = find(root, value);
		if (result typeof Node) {
			// remove somehow
			// ???
			// sdf
			// rebalance tree
			rebalance(root);
			return true;
		}
		else {
			return false;
		}
	}

	this.getInOrder = function getInOrder() {

		if (!root) { return false; }
		// get min value first
		var node = root.left;
		while (node !== null) {
			node = node.left;
		}

		return {
			next: function () {
				var value = node.value;
				node = one_node_higher(node);
				return value || false;
			}
		}
	}

	this.getPreOrder = function getPreOrder() {}

	this.getPostOrder = function getPostOrder() {}

}