// controller
const models = require('../models');

const { Location } = models;

const locPage = (req, res) => res.render('app');

module.exports.locPage = locPage;
