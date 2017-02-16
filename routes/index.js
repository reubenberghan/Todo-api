'use strict';

const routes = require('express').Router();
const todos = require('./todos');

routes.use('/todos', todos);

module.exports = routes;
