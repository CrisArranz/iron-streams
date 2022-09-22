require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const mongoose = require("mongoose");

require('./config/db.config');

const app = express();

app.use(logger('dev'));
app.use(express.json());

//CORS Middleware
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");
  next();
})

const routes = require('./config/routes.config');
app.use('/api/v1', routes)


app.use((req, res, next) => next(createError(404, 'Route not found')))

app.use((error, req, res, next) => {
  const { message, status } = error;
  res.status(status || 500);

  const data = {};

  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400);

    for (field of Object.keys(error.errors)) {
      error.errors[field] = error.errors[field].message;
    }

    data.errors = error.errors;
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(404, "Resource not found");
  }

  data.message = message;

  res.json(data);
})

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Levantado en el puerto ${port}...`))