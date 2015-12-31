var gph = require('../graph');
var clc = require('cli-color');

function testGraph() {

	console.log('Begining Graph test...');

	var g = new gph.getGraph();
	g.addVertecies('one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight');
	
	g.addEdge('one', 'two');
	g.addEdge('two', 'four');
	g.addEdge('one', 'three');
	g.addEdge('three', 'five');
	g.addEdge('four', 'six');
	g.addEdge('five', 'seven');
	g.addEdge('four', 'eight');
	
	g.dfs('one');

	console.log('\n');
	g.bfs('one');

	console.log('\n');
	var shortest = g.sorthestPath('eight', 'seven');
	// console.log(shortest);

	if (shortest) {	// && typeof shortest == 'Array') {
		var string_b = '';
		for (var i = 0; i < shortest.length - 1; i++) {
			string_b += shortest[i] + ' -> ';
		}
		string_b += shortest[shortest.length - 1];
		console.log('Shortest path: ');
		console.log(string_b);
	}

	g.toString();

}

testGraph();