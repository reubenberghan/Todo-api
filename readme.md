# RESTful Todo api

Uses Node.js and Express to create the server and REST API then the Sequelize ORM and SQLite to manage the persistence of the todo data.

Also incorporates an authentication layer using crypto-js, bcrypt and also jsonwebtoken to encrypt sensitive data and ensure that only authenticated users can communicate and access only their todos.

## API Endpoints

### GET

**URI***: /todos
