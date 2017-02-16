'use strict';

module.exports = (req, res) => {
  res.status(200).json({ message: `Get todo id: ${ req.params.id }` });
};
