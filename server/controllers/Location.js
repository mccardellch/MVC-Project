// controller
const models = require('../models');

const { Location } = models;

const getLocation = (req, res) => {
  console.log('get locations')
}

const search = (req, res) => res.render('app');
const add = (req, res) => res.render('app');


// create a new location
const addLocation = (req, res) => {
  console.log('add location');
}

module.exports.getLocation = getLocation;
module.exports.searchPage = search;
module.exports.addPage = add;
module.exports.add = addLocation;
