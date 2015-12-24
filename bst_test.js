var bst = require('./bst');
var clc = require('cli-color');

function testBST(num) {

	console.log('Begining BST test...');
	console.log('Testing with n = ' + num + 'values.');

	// create our BST object
	var myBST = new bst.getBST();
	//console.log(myBST);

	// create the array of test values
	var values = [];
	for (var n = 0; n < num; n++) {
		values.push(Math.random());
	}

	// print the values
	//console.log('\n');
	//console.log('*** Sorted Array Values ***');
	var sorted = JSON.parse(JSON.stringify(values));	// copy array
	sorted.sort();										// sort array
	// for (var s = 0; s < sorted.length; s++) {
	// 	console.log(sorted[s]);
	// }
	//var str = sorted.join(', ');						// stringify
	//console.log(str);									// and print

	// add the values to the BST
	// console.log('\n');
	// console.log('Adding values to the BST...');
	for (var i = 0; i < values.length; i++) {
		myBST.add(values[i]);
	}
	// console.log('BST load complete.');


	// get the min value
	// console.log('\n');
	// console.log('*** Testing Min Value ***');
	// console.log('Sorted min: ' + sorted[0]);
	// console.log('BST min: ' + myBST.min());
	if (sorted[0] === myBST.min()) {
		console.log('BST min test passed.');
	}
	else {
		console.log(clc.red('BST min test failed.'));
		console.log(clc.red('Sorted min: ' + sorted[0] + '. BST min: ' + myBST.min()));
	}


	// get the max value
	// console.log('\n');
	// console.log('*** Testing Max Value ***');
	if (sorted[sorted.length - 1] === myBST.max()) {
		console.log('BST max test passed.');
	}
	else {
		console.log(clc.red('BST max test failed.'));
		console.log(clc.red('Sorted max: ' + sorted[sorted.length - 1] + '. BST max: ' + myBST.max()));
	}


	// get the count of values
	// console.log('\n');
	// console.log('*** Testing Count ***');
	// console.log('Array length: ' + values.length + '. BST count: ' + myBST.count());
	if (values.length === myBST.count()) {
		console.log('BST count test passed.');
	}
	else {
		console.log(clc.red('BST count test failed.'));
		console.log(clc.red('Array length: ' + sorted.length + '. BST count: ' + myBST.count()));
	}


	// find each specific value from the array
	// console.log('\n');
	// console.log('*** Testing Find ***');
	var failed = false;
	for (var z = 0; z < values.length; z++) {
		//console.log('Trying to find: ' + values[z] + '. Found: ' + myBST.get(values[z]));
		if (values[z] !== myBST.get(values[z])) {
			console.log(clc.red('Test failed!  Tried to get value ' + values[z] + ' instead got value ' + myBST.get(values[z])));
		}
	}
	if (!failed) {
		console.log('All find tests passed.');
	}

	// in order traversal
	// console.log('\n');
	// console.log('*** In Order Traversal ***');
	console.log(clc.green('Array in order traversal :)'));
	for (var s = 0; s < sorted.length; s++) {
		console.log(clc.green(sorted[s]));
	}

	console.log(clc.blue('BST in-order traversal...'));
	myBST.getInOrder();

	console.log(clc.blue('BST rev-order traversal...'));
	myBST.getRevOrder();

	console.log(clc.blue('BST pre-order traversal...'));
	myBST.getPreOrder();

	console.log(clc.blue('BST post-order traversal...'));
	myBST.getPostOrder();

}

testBST(10);