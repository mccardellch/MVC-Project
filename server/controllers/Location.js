// controller
const models = require('../models');

const { Location } = models;

const locPage = (req, res) => res.render('app');


// create a new location
const addLocation = (req, res) => {
  
}

module.exports.locPage = locPage;
