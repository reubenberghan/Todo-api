# RESTful Todo api

Uses Node.js and Express to create the server and REST API then the Sequelize ORM and SQLite to manage the persistence of the todo data.

Also incorporates an authentication layer using crypto-js, bcrypt and also jsonwebtoken to encrypt sensitive data and ensure that only authenticated users can communicate and access only their todos.

## API Endpoints

All data is returned in JSON format.

HTTP Method | URI | Description
--- | --- | ---
GET | /todos | Will return all todos for authenticated user. Also has the option to be given the query parameters `completed` and/or `q`. `completed` takes a boolean value which filters the returned todo list by whether the todo is completed or not. `q` takes a string which is used to filter the returned todos with the SQL LIKE operator.
GET | /todos/:id | Returns a todo by id where `:id` is the id of a particular todo.
