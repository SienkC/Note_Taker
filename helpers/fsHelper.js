const fs = require('fs');

// promisify function readFile
const util = require('util');
const readFrom = util.promisify(fs.readFile);

// file is where data is saved to
// this will replace content currently in file with new content
const overWrite = (file, content) =>
    fs.writeFile(file, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nUpdated ${file}`)
);

// this will add the content to the end of the file
const addTo = (file, content) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        }
        else {
            // "de-stringify" data back into JSON
            const grabbedData = JSON.parse(data);

            // Add new content to the end of the old data
            grabbedData.push(content);

            // use prev function to update file with new data
            overWrite(file, grabbedData);
        }
    });
};

module.exports = { readFrom, overWrite, addTo };