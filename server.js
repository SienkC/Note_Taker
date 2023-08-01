// enable express and path
const express = require('express');
const path = require('path');

// link to router
const routes = require('./routes/index');

// port that will work with heroku
const PORT = process.env.PORT || 3001;

// create instance of express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// requests api go to routes folder
app.use('/api', routes);

// GET notes goes to notes.html
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// for anything else
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);