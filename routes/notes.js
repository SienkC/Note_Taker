const notes = require('express').Router();

// get fs functions from helpers folder
const { readFrom, overWrite, addTo } = require('../helpers/fsHelper');

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
notes.delete('/:id', (req, res) => {
    // get id number
    const givenId = parseInt(req.params.id);
    let index = -1;

    // get all current notes
    readFrom('./db/db.json').then((data) => {
        if(data != '') {
            const parsedData = JSON.parse(data);
        
            // check for mathing id
            for(let i = 0; i < parsedData.length; i++){
                if(givenId === parsedData[i].id) {
                    // save index
                    index = i;
                }
            }
    
            if(index > -1) {
                // delete matching note
                parsedData.splice(index, 1);
    
                // update db file
                overWrite('./db/db.json', parsedData);
            }
        }
        // show successful addition note
        res.json('Note was deleted');
    })
})


module.exports = notes;