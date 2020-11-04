// controller
const models = require('../models');

const {
  Location
} = models;

// add a new location
const addLocation = (req, res) => {
  if (!req.body.name || !req.body.type || !req.body.long || !req.body.lat) {
    return res.status(400).json({
      error: 'All fields are required.'
    });
  }

  const locData = {
    name: req.body.name,
    type: req.body.type,
    longitude: req.body.long,
    latitude: req.body.lat,
    owner: req.session.account._id,
  };

  const newLocation = new Location.LocationModel(locData);

  const locationPromise = newLocation.save();

  locationPromise.then(() => res.json({
    redirect: '/add'
  }));

  locationPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({
        error: 'This location already exists.'
      });
    }

    return res.status(400).json({
      error: 'An error occured.'
    });
  });

  return locationPromise;
};

// render and return locations
const myLocations = (req, res) => {
  // grab all the Locations for a particular user and pass it to the view
  Location.LocationModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occured.'
      });
    }

    return res.render('app', {
      csrfToken: req.csrfToken(),
      locations: docs
    });
  });
}

// return just locations
const getMyLocations = (request, response) => {
  const req = request;
  const res = response;

  return Location.LocationModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occurred'
      });
    }

    return res.json({
      locations: docs
    });
  });
}

const searchPage = (req, res) => res.render('app');

const addPage = (req, res) => res.render('app');

module.exports.myLocations = myLocations;
module.exports.getMyLocations = getMyLocations;
module.exports.searchPage = searchPage;
module.exports.addPage = addPage;
module.exports.add = addLocation;
