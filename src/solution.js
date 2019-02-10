const solution = function(graph, start, finish)  {
	let unvisited = Object.keys(graph),
    	visited = [], 
      	result = {distance: +Infinity, path: []},
      	routes = {};
    
    unvisited.forEach((item) => createTableRoutes(item, routes));

    while (unvisited != '') {

	    let vertexesSorted = Object.keys(routes).sort(function(a, b){ return routes[a]['length'] - routes[b]['length'] }), 
	    	visitingVertex; 

	    vertexesSorted.some(item => {
	    	visitingVertex = item;
	    	return unvisited.includes(item);
	    });

	    let vertexes = Object.keys(graph[visitingVertex]);

	    vertexes.forEach(item => {
	    	let newPathLen = routes[visitingVertex]['length'] + graph[visitingVertex][item];

	    	if (newPathLen < routes[item]['length']) {
	    		routes[item]['length'] = newPathLen;
	    		routes[item]['path'] = visitingVertex;
	    	}  
	    });

	    visited.push(unvisited.splice(unvisited.indexOf(visitingVertex), 1));

	}

	createPath(result, finish, routes);

	result.distance = routes[finish]['length'];

	return result;
};

function createTableRoutes(item, routes) {
	routes[item] = {};
	routes[item]['path'] = '';

    if (item == start) {
    	routes[item]['length'] = 0;
    	return;
    }

    routes[item]['length'] = +Infinity;
};

function createPath(result, finish, routes) {
	let item = finish;

    while (item != '') {
    	result.path.unshift(item);
    	item = routes[item]['path'];
    }
};
