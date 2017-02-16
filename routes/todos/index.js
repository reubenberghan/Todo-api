'use strict';

// init todos router
const todos = require('express').Router();

// require routes
const get = require('./get');
const getById = require('./getById');
const create = require('./create');
const deleteById = require('./deleteById');
const updateById = require('./updateById');

// attach routes to todos router
todos.get('/', get);
todos.get('/:id', getById);
todos.post('/', create);
todos.delete('/:id', deleteById);
todos.post('/:id', updateById);

module.exports = todos;
