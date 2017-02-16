'use strict';

const todos = require('express').Router();

const get = require('./get');
const getById = require('./getById');
const create = require('./create');
const deleteById = require('./deleteById');
const updateById = require('./updateById');

todos.get('/', get);
todos.get('/:id', getById);
todos.post('/', create);
todos.delete('/:id', deleteById);
todos.post('/:id', updateById);

module.exports = todos;
