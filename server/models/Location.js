// model

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let LocationModel = {};

// mongoose.Types.ObjectId is a function
// that converts string ID to real mongoID
const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const LocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

LocationSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  type: doc.type,
  longitude: doc.longitude,
  latitude: doc.latitude,
});

//find locations created by the owner
LocationSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return LocationModel.find(search).select('name type longitude latitude').lean().exec(callback);
};

//find locations by the type 
LocationSchema.statics.findByType = (type, callback) => {
  const search = {
    type: type,
  };

  return LocationModel.find(search).select('name type longitude latitude').lean().exec(callback);
};

LocationModel = mongoose.model('Location', LocationSchema);

module.exports.LocationModel = LocationModel;
module.exports.LocationSchema = LocationSchema;
