'use strict';

const routes = require('express').Router();

routes.get('/test', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;
