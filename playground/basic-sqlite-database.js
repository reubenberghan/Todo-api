var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

sequelize.sync({
	// force: true
}).then(function() {
	console.log('Everything is synced');
	
	Todo.findById(2)
		.then(function(todo) {
			if (!todo) {
				return console.log('No todo by that id');
			}
			console.log(todo.toJSON());
		})
		.catch(function(e) {
			console.log(e);
		});
	
	// Todo.create({
	// 	description: 'walk the dog',
	// 	completed: false
	// })
	// .then(function(todo) {
	// 	return Todo.create({
	// 		description: 'clean office'
	// 	});
	// })
	// .then(function() {
	// 	// return Todo.findById(1);
	// 	return Todo.findAll({
	// 		where: {
	// 			description: {
	// 				$like: '%office%'
	// 			}
	// 		}
	// 	});
	// })
	// .then(function(todos) {
	// 	if (todos) {
	// 		todos.forEach(function(todo) {
	// 			console.log(todo.toJSON());
	// 		})
	// 	} else {
	// 		console.log('No todos found');
	// 	}
	// })
	// .catch(function(e) {
	// 	console.log(e);
	// });
});