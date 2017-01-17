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
Sending a POST request to this endpoint will create a new todo for the authenticated user.

The new todo will need to be contained in the body of the request in JSON format and must have a `"description"` property of type `string` and not be empty the `"completed"` property is optional and a default will be set if not provided however if is present then must be of type `boolean`.

#### /users
This endpoint will create a new user.

Similar to the todo the user will need to be a JSON object in the body. It will require an `"email"` property of type `string`, the string will also be validated as an email or not, and a `"password"` property of type `string`. Both a required to create a user and must not be empty strings.

A salt will be generated to be added to the password and both the salt and the resulting hash of combining the password and salt will be encrypted before being saved to the database.
