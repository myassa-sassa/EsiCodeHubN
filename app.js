const express      = require('express');
const app          = express();
const routes       = require('./src/routes');
const errorHandler = require('./src/middleware/errorHandler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);
app.use(errorHandler);

module.exports = app;