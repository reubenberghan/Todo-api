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
});

// DELETE /todos/:id
app.delete('/todos/:id', function(req, res) {
	
	var todoId = parseInt(req.params.id, 10);
	
	db.todo.destroy({ where: { id: todoId } })
		.then(function(rowsDeleted) {
			if (rowsDeleted === 0) {
				res.status(404).json({ "error": "No todo with that id found." });
			} else {
				res.status(204).send();
			}
		})
		.catch(function() { res.status(500).send(); });
});

// PUT /todos/:id
app.put('/todos/:id', function(req, res) {
	
	var body = _.pick(req.body, ['description','completed']),
		todoId = parseInt(req.params.id, 10),
		attributes = {};
	
	if (body.hasOwnProperty('completed')) {
		attributes.completed = body.completed;
	}
	
	if (body.hasOwnProperty('description')) {
		attributes.description = body.description;
	}
	
	db.todo.findById(todoId)
		.then(function(todo) {
			if (!todo) {
				return res.status(404).send()
			}
			return todo.update(attributes);
		}, function() {
			res.status(500).send();
		})
		.then(function(todo) {
			res.json(todo);
		}, function(e) {
			res.status(400).json(e);
		});
	
});

app.post('/users', function(req, res) {
	var body = _.pick(req.body, ['email','password']);
	
	db.user.create(body)
		.then(function(user) {
			res.send(user.toPublicJSON(['id','email','updatedAt','createdAt']));
		})
		.catch(function(e) {
			res.status(400).json(e);
		});
	
});

db.sequelize.sync().then(function() {
	app.listen(PORT, function() { console.log('Express listening on port: ' + PORT) });
});
