const { Stream } = require('../models');

module.exports.list = (req, res, next) => {
  
  Stream
    .find()
    .then(streams => streams ? res.status(200).json(streams) : next(createError(404, "Streams not found")))
    .catch(next)
}

module.exports.create = (req, res, next) => {

  const { title, author, url, description, views, category, duration, thumbnail, private } = req.body;
  const data = { title, author, url, description, views, category, duration, thumbnail, private };

  Stream
    .create(data)
    .then(stream => {
      res.status(201).json(stream)
    })
    .catch(next);
}

module.exports.detail = (req, res, next) => {

  const { id } = req.params;

  Stream
    .findById(id)
    .then(stream => stream ? res.status(200).json(stream) : next(createError(404, "Stream not found")))
    .catch(next)
}

module.exports.update = (req, res, next) => {

  const { id } = req.params;

  const { title, author, url, description, views, category, duration, thumbnail, private } = req.body;
  const data = { title, author, url, description, views, category, duration, thumbnail, private };

  Stream
    .findByIdAndUpdate(id, data, { new: true, runValidators: true })
    .then(stream => stream => stream ? res.status(200).json(stream) : next(createError(404, "Stream not found")))
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  const { id } = req.params;
  Stream
    .findByIdAndDelete(id)
    .then(stream => stream ? res.status(204).send() : next(createError(404, "Stream not found")))
    .catch(next)
}