'use strict';

// init users router
const users = require('express').Router();

// require routes
const create = require('./create');
const login = require('./login');
const logout = require('./logout');

// attach routes to users router
users.post('/', create);
users.post('/login', login);
users.delete('/', logout);

module.exports = users;
