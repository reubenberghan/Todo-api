'use strict';

// init API router
const routes = require('express').Router();

// require top level routes
const todos = require('./todos');

// attach routes to router
routes.use('/todos', todos);

module.exports = routes;
