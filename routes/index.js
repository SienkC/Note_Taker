const express = require('express');

// get file for route
const notesRouter = require('./notes');

const app = express();

// api/notes goes to notes router
app.use('/notes', notesRouter);

module.exports = app;