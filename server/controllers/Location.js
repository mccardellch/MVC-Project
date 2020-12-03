// controller
const models = require('../models');

const {
  Location,
} = models;

// add a new location
const addLocation = (req, res) => {
  if (!req.body.name || !req.body.type || !req.body.location || !req.body.about) {
    return res.status(400).json({
      error: 'All fields are required.',
    });
  }

  const locData = {
    name: req.body.name,
    type: req.body.type,
    location: req.body.location,
    about: req.body.about,
    owner: req.session.account._id,
  };

  const newLocation = new Location.LocationModel(locData);

  const locationPromise = newLocation.save();

  locationPromise.then(() => res.json({
    redirect: '/add',
  }));

  locationPromise.catch((err) => {
    //    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({
        error: 'This location already exists.',
      });
    }

    return res.status(400).json({
      error: 'An error occured.',
    });
  });

  return locationPromise;
};

// render and return locations
const myLocations = (req, res) => {
  // grab all the Locations for a particular user and pass it to the view
  Location.LocationModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      //      console.log(err);
      return res.status(400).json({
        error: 'An error occured.',
      });
    }

    return res.render('app', {
      csrfToken: req.csrfToken(),
      locations: docs,
    });
  });
};

// return just locations
const getMyLocations = (request, response) => {
  const req = request;
  const res = response;

  return Location.LocationModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      return res.status(400).json({
        error: 'An error occurred',
      });
    }

    return res.json({
      locations: docs,
    });
  });
};

const getLocationsType = (request, response) => {
  const req = request;
  const res = response;

  return Location.LocationModel.findByType(req.body.type, (err, docs) => {
    if (err) {
      return res.status(400).json({
        error: 'An error occurred',
      });
    }

    return res.json({
      locations: docs,
    });
  });
};

const searchPage = (req, res) => res.render('app1');

const addPage = (req, res) => res.render('app');

module.exports.add = addLocation;
module.exports.myLocations = myLocations;
module.exports.getMyLocations = getMyLocations;
module.exports.getLocationsType = getLocationsType;
module.exports.searchPage = searchPage;
module.exports.addPage = addPage;
