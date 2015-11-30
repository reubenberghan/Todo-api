var express = require('express'),
	bodyParser = require('body-parser'),
	_ = require('underscore'),
	db = require('./db'),
	app = express(),
	PORT = process.env.PORT || 3000,
	todos = [],
	todoNextId = 1;
	
app.use(bodyParser.json());
	
app.get('/', function(req, res) {
	res.send('Todo API Root');
});

// GET /todos?completed=false&q=work
app.get('/todos', function(req, res) {
	var queryParams = _.pick(req.query, ['q','completed']),
		where = {};
	
	if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
		where.completed = true;
	} else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
		where.completed = false;
	}
	
	if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
		where.description = { $like: '%' + queryParams.q + '%' };
	}
	
	db.todo.findAll({ where: where })
		.then(function(todos) {
			res.json(todos);
		})
		.catch(function(e) {
			res.status(400).json(e);
		});
	
	// var filteredTodos = todos;
	// 
	// if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
	// 	filteredTodos = _.where(filteredTodos, { completed: true });
	// } else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
	// 	filteredTodos = _.where(filteredTodos, { completed: false });
	// }
	// 
	// if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
	// 	filteredTodos = _.filter(filteredTodos, function(todo) {
	// 		return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
	// 	});
	// }
	// 
	// res.json(filteredTodos);
});

// GET /todos/:id
app.get('/todos/:id', function(req, res) {
	
	var todoId = parseInt(req.params.id, 10);
	
	db.todo.findById(todoId)
		.then(function(todo) {
			if (!todo) {
				return res.status(404).send();
			}
			res.json(todo);
		})
		.catch(function(e) {
			res.status(400).json(e);
		});
	
	// var matchedTodo = _.findWhere(todos, { id: todoId });
	// 
	// if (!matchedTodo) {
	// 	res.status(404).send();
	// } else {
	// 	res.json(matchedTodo);
	// }
});

// POST /todos
app.post('/todos', function(req, res) {
	var body = _.pick(req.body, ['description','completed']);
	
	if (!_.isBoolean(body.completed) ||
		!_.isString(body.description) ||
		body.description.trim().length === 0) {
		return res.status(400).send();
	}
	
	body.description = body.description.trim();
	
	db.todo.create(body)
		.then(function(todo) {
			res.json(todo);
		})
		.catch(function(e) {
			res.status(500).json(e);
		});
	
	// body.id = todoNextId++;
	// todos.push(body);
	// 
	// res.json(body);
});

// DELETE /todos/:id
app.delete('/todos/:id', function(req, res) {
	
	var todoId = parseInt(req.params.id, 10),
		matchedTodo = _.findWhere(todos, { id: todoId });
	
	if (!matchedTodo) {
		return res.status(404).json({ "error": "No todo found with that id" });
	}
	
	todos = _.without(todos, matchedTodo);
	
	res.json(matchedTodo);
});

// PUT /todos/:id
app.put('/todos/:id', function(req, res) {
	
	var body = _.pick(req.body, ['description','completed']),
		todoId = parseInt(req.params.id, 10),
		matchedTodo = _.findWhere(todos, { id: todoId }),
		validAttributes = {};
		
	if (!matchedTodo) {
		return res.status(404).send();
	}
	
	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;
	} else if (body.hasOwnProperty('completed')) {
		return res.status(400).send();
	}
	
	if (body.hasOwnProperty('description') &&
		_.isString(body.description) &&
		body.description.trim().length > 0) {
		validAttributes.description = body.description;
	} else if (body.hasOwnProperty('description')) {
		return res.status(400).send();
	}
	
	res.json(_.extend(matchedTodo, validAttributes));
	
});

db.sequelize.sync().then(function() {
	app.listen(PORT, function() { console.log('Express listening on port: ' + PORT) });
});
