function Graph() {

	var exp = {}, vertices = [], adjacencies = [], edges = 0;
	var visited = [], search_queue = [];

	function Vertex(label) {
		this.label = label;
		this.index = vertices.length;
		this.adj = adjacencies.length;
		vertices.push(this);
		adjacencies.push([]);
	}

	function find(label) {
		for (var i = 0; i < vertices.length; i++) {
			if (vertices[i].label === label) {
				return i;
			}
		}
		return null;
	}

	function dfs(index) {
		var linked = adjacencies[index];
		for (var i = 0; i < linked.length; i++) {
			if (visited[linked[i]] !== true) {		// hasn't been visited yet
				visited[linked[i]] = true;		// but it has now
				console.log('Visiting ' + vertices[linked[i]].label);
				dfs(linked[i]);
			}
		}
	}

	exp.addVertecies = function (labels) {
		for (var l = 0; l < arguments.length; l++) {
			if (arguments[l] !== undefined) {
				new Vertex(arguments[l]);
			}
		}
	};

	exp.addEdge = function (labelFrom, labelTo) {
		var from_index = find(labelFrom);
		var to_index = find(labelTo);
		adjacencies[from_index].push(to_index);
		adjacencies[to_index].push(from_index);
		edges++;
	};

	exp.dfs = function (label) {
		var found = find(label);
		if (found !== null) {
			console.log('Starting DFS at ' + vertices[found].label);
			visited = Array(vertices.length);		// reset search helper array
			visited[found] = true;
			dfs(found);
		}
	};

	exp.bfs = function (label) {
		console.log('Starting BFS at ' + label);
		var queue = [];
		var visited = Array(vertices.length);
		var found = find(label);
		if (found !== null) {
			queue.push(found);
			visited[found] = true;
			var next = null;
			while (queue.length > 0) {
				next = queue.shift();
				visited[next] = true;
				console.log('Visiting ' + vertices[next].label);
				for (var i = 0; i < adjacencies[next].length; i++) {
					if (!visited[adjacencies[next][i]]) {
						queue.push(adjacencies[next][i]);
					}
				}
			}
		}
	};

	exp.pathsBetween = function (labelFrom, labelTo) {
		//gjg
	};

	exp.sorthestPath = function (labelFrom, labelTo) {
		var from_index = find(labelFrom);
		var to_index = find(labelTo);
		var finished_find = false;
		if (from_index !== null && to_index !== null) {
			var queue = [], visited = Array(vertices.length), cameFrom = Array(vertices.length);
			visited[from_index] = true;
			queue.push(from_index);
			var temp, cur_link;
			while (queue.length > 0) {
				temp = queue.shift();			// get our next item
				for (var l = 0; l < adjacencies[temp].length; l++) {	// iterate through linked verticies
					cur_link = adjacencies[temp][l];
					if (!visited[cur_link]) {			// make sure we haven't visited this one yet
						cameFrom[cur_link] = temp;		// !!! -> mark our tracks so we can backtrace the shortest path
						visited[cur_link] = true;			// mark as visited
						queue.push(cur_link);	// then push to work queue
						if (cur_link === to_index) {	// found the shortest path
							finished_find = true;
							break;
						}
					}
				}
				if (finished_find) {
					break;
				}
			}
			// now move on to our backtrace
			if (visited[to_index]) {
				var backtrace = [], current, index;
				current = to_index;
				backtrace.unshift(vertices[current].label);
				do {
					current = cameFrom[current];
					backtrace.unshift(vertices[current].label);
				} while (current !== from_index);
				return backtrace;
			}
		}
		// fallthrough case
		return undefined;
	};

	exp.topSort = function () {};

	exp.toString = function () {
		var temp_str = '';
		for (var q = 0; q < adjacencies.length; q++) {
			temp_str = '';
			for (var w = 0; w < adjacencies[q].length; w++) {
				temp_str += adjacencies[q][w] + ' ';
			}
			console.log(vertices[q].label + '(' + q + ') -> ' + temp_str);
		}
		// console.log(vertices);
		// console.log(adjacencies);
		// console.log(visited);
	};

	return exp;
}

exports.getGraph = function () {
	return new Graph();
};