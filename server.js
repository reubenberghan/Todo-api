var express = require('express'),
	app = express(),
	PORT = process.env.PORT || 3000,
	todos = [{
		description: 'Meet mum for lunch',
		completed: false,
		id: 1
	},
	{
		description: 'Go to market',
		completed: false,
		id: 2
	},
	{
		description: 'Pick up dry cleaning',
		completed: true,
		id: 3
	}];
	
app.get('/', function(req, res) {
	res.send('Todo API Root');
});

// GET /todos
app.get('/todos', function(req, res) {
	res.json(todos);
});

// GET /todos/:id
app.get('/todos/:id', function(req, res) {
	
	var todoId = parseInt(req.params.id, 10),
		matchedTodo;
	
	for (var i = 0; i < todos.length; i++) {
		if (todoId === todos[i].id) {
			matchedTodo = todos[i];
		}
	}
	
	if (!matchedTodo) {
		res.status(404).send();
	} else {
		res.json(matchedTodo);
	}
	
	// res.send('Asking for todo with id of ' + req.params.id);
});

app.listen(PORT, function() { console.log('Express listening on port: ' + PORT) });