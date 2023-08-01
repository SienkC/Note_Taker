// create a random number for the id
module.exports = () => 
  Math.floor((1 + Math.random()) * 0x10000);
