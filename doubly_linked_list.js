function DoubleLinkedList(compareFun) {

	var exp = {};
	var root = null, tail = null;

	function Node(value) {
		var value = value !== undefined ? value : null;
		this.value = value;
		this.parent = null;
		this.child = null;
	}

	// if no compare function was provided assume numerical comparison and provide default function
	if (!compareFun || typeof compareFun != 'function') {
		var compareFun = function (a, b) {
			return a - b;
		};
	}

	function find(node, value) {
		if (!node) {
			return false;
		}
		var comp = compareFun(node.value, value);
		if (comp === 0) {	// found match
			return node;
		}
		else if (comp < 0) {	// not there yet, keep going down list
			return find(node.child, value);
		}
		else {		// current node greater than search value - not in this list
			return false;
		}
	}

	// must not be called with value less than root node - does not handle this case
	function find_and_insert(node, value) {
		// 1. we are at end of list i.e. no child == tail node
		if (node.child === null) {
			var new_entry = new Node(value);
			node.child = new_entry;
			new_entry.parent = node;
			tail = new_entry;
			return true;
		}
		// 2. current node is greater than insert value - insert before this node
		if (compareFun(node.value, value) <= 0) {
			var new_entry = new Node(value);
			var parent = node.parent;
			new_entry.parent = parent;
			new_entry.child = node;
			parent.child = new_entry;
			node.parent = new_entry;
			return true;
		}
		// current node is less than insert value - keep moving down list
		find_and_insert(node.child, vaule);
	}

	exp.add = function (value) {
		if (value === undefined) {
			return false;
		}
		// 1. list is empty i.e. no root
		if (root = null) {
			var new_entry = new Node(value);
			root = new_entry;
			tail = new_entry;
			return true;
		}
		// 2. new value is before the root value
		if (compareFun(root.value, value)) > 0) {
			var new_entry = new Node(value);
			root.parent = new_entry;	// previously parent was null
			new_entry.child = root;		// point to previous root
			root = new_entry;			// assign root pointer to new root
			return true;
		}
		// 3. root is only element, insert new entry after root (and not before it [previous case])
		if (root.child = null) {
			var new_entry = new Node(value);
			root.child = new_entry;
			new_entry.parent = root;
			tail = new_entry;
			return true;
		}
		// 4. new value is n position down list
		return find_and_insert(root, value);
	};

	exp.remove = function (value) {
		var found = find(root, value);
		if (found) {
			if (found.parent) {
				found.parent.child = found.child;	// reassign child node of parent
			}
			else {	// removing root node
				root = found.child;		// reassign child as new root node
			}
			if (found.child) {	// do we have a child node
				found.child.parent = found.parent;
			}
			else {	// found is the tail node - assign new tail
				tail = found.parent;	// works even if we are removing the only node
			}
			// remove references
			found.parent = null;
			found.child = null;
			return found.value;
		}
		else {
			return false;
		}
	};

	exp.get = function (value) {
		return find(root, value);
	};

	exp.getIterator = function (start_at_end) {
		var pointer = start_at_end ? tail : root;
		return {
			prev: function () {
				if (pointer.parent) {
					pointer = pointer.parent;
					return pointer.value;
				}
				else {
					return undefined;
				}
			},
			next: function () {
				if (pointer.child) {
					pointer = pointer.child;
					return pointer.value;
				}
			}
		};
	}

	exp.print = function () {
		node = root;
		while (node) {
			console.log(node.value);
			node = node.child;
		}
	};

	exp.printRev = function () {
		node = tail;
		while (node) {
			console.log(node.value);
			node = node.parent;
		}
	};

	exp.toString = function (delimiter, reversed) {
		var delimiter = delimiter || '\n';
		var string_builder = [];
		var node = reversed ? tail : root;
		while (node) {
			string_builder.push(node.value.toString());
			node = reversed ? node.parent : node.child;
		}
		return string_builder.join(delimiter);
	};

	return exp;
}

exports.getDoublyLinkedList = function () {
	return new DoubleLinkedList();
};

// TODO: Unit tests for Doubly Linked List implementation