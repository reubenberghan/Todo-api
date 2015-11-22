var express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	PORT = process.env.PORT || 3000,
	todos = [],
	todoNextId = 1;
	
app.use(bodyParser.json());
	
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

// POST /todos
app.post('/todos', function(req, res) {
	var body = req.body;
	
	body.id = todoNextId++;
	todos.push(body);
	
	res.json(body);
});

app.listen(PORT, function() { console.log('Express listening on port: ' + PORT) });