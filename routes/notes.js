const notes = require('express').Router();

// get fs functions from helpers folder
const { readFrom, addTo } = require('../helpers/fsHelper');

// get id function from helpers folder
const idCreator = require('../helpers/idCreator');

// get notes
notes.get('/', (req, res) => {
    // read the data from db file
    readFrom('./db/db.json').then((data) => {
        const parsedData = JSON.parse(data);
        // display the data
        res.json(parsedData);
    })
});

// post new note
notes.post('/', (req, res) => {
    // add function to add to .json file

    // get info to add from request
    const { title, text } = req.body;

    // if there is a body
    if(req.body) {
        const note = {
            title,
            text,
            id: idCreator()
        };

        // test
        console.log(note);


        // add new note to notes db
        addTo('./db/db.json', note);
        
        // show successful addition note
        res.json('Note was added');
    }
    else {
        res.error('Could not add note');
    }
});

// add delete note function
app.delete('/:id', (req, res) => {
    // get all current notes
    // check if given id matches any
    // delete matching note
})


module.exports = notes;