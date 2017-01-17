# RESTful Todo api

Uses Node.js and Express to create the server and REST API then the Sequelize ORM and SQLite to manage the persistence of the todo data.

Also incorporates an authentication layer using crypto-js, bcrypt and also jsonwebtoken to encrypt sensitive data and ensure that only authenticated users can communicate and access only their todos.

## API Endpoints

All data is returned in JSON format.

### GET requests

#### /todos
Will return all todos for authenticated user.

Also has the option to be given the query parameters `completed` and/or `q`. `completed` takes a boolean value which filters the returned todo list by whether the todo is completed or not. `q` takes a string which is used to filter the returned todos with the SQL LIKE operator.

For example `/todos?completed=false&q=clean` would return all todos that had a completed value of `false` and the todo description contained the string `clean`.

#### /todos/:id
Returns a todo by ID where `:id` is the ID of a particular todo.

### POST requests

#### /todos
Sending a POST HTTP request to this endpoint will create a new todo for the authenticated user.

The new todo will need to be contained in the body of the request in JSON format and must have a `"description"` property of type `string` and not be empty the `"completed"` property is optional and a default will be set if not provided however if is present then must be of type `boolean`.
