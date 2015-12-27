var bst = require('./linked_list');
var clc = require('cli-color');

function testLL(num) {

	console.log('Begining Linked List test...');
	console.log('Testing with n = ' + num + 'values.');

	// create our BST object
	var myLL = new bst.getLinkedList();
	// console.log(myLL);

	// create the array of test values
	var values = [], finds = [], removes = [], additions = [];
	for (var n = 0; n < num; n++) {
		values.push(Math.random());
		myLL.add(values[n]);

		// add ever second to a find or remove array
		if (n%2 === 0) {
			finds.push(values[n]);
		}
		else {
			removes.push(values[n]);
		}
	}

	for (var d = 3; d < 23; d++) {
		if (d%3 === 0) {
			additions.push(d);
		}
		if (d%2 === 0) {
			finds.push(d);
		}
		else {
			removes.push(d);
		}
	}

	// print the values
	// console.log('\n');
	// console.log('*** Sorted Array Values ***');
	var sorted = JSON.parse(JSON.stringify(values));	// copy array
	sorted.sort();
	// for (var i = 0; i < sorted.length; i++) {
	// 	console.log(sorted[i]);
	// }

	// print from LL
	console.log('*** Linked List Values ***');
	myLL.inOrder();


	console.log('*** Find Values Test ***');
	for (var f = 0; f < finds.length; f++) {
		console.log('Finding ' + finds[f] + ' found ' + myLL.get(finds[f]));
	}


	console.log('*** Removing & Additions Test ***');
	for (var r = 0; r < removes.length; r++) {
		myLL.remove(removes[r]);
	}
	for (var a = 0; a < additions.length; a++) {
		myLL.add(additions[a]);
	}
	console.log('*** Linked List Values (After remove) ***');
	myLL.inOrder();

	console.log('\n');
	console.log('\n');
	// end
}

testLL(13);
testLL(19);