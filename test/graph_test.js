var gph = require('../graph');
var clc = require('cli-color');

function testGraph() {

	console.log('Begining Graph test...');

	var g = new gph.getGraph();
	g.addVertecies('mat', 'bob', 'job', 'steve', 'ezra');
	
	g.addEdge('mat', 'bob');
	g.addEdge('bob', 'steve');
	g.addEdge('mat', 'job');
	g.addEdge('job', 'ezra');
	
	g.dfs('mat');
	g.bfs('mat');
	
	g.toString();

}

testGraph();