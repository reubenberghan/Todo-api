'use strict';

// init API router
const routes = require('express').Router();

// require top level routes
const todos = require('./todos');
const users = require('./users');

// attach routes to router
routes.use('/todos', todos);
routes.use('/users', users);

module.exports = routes;
