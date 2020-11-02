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
  age: doc.age,
  level: doc.level,
});

LocationSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return LocationModel.find(search).select('name longitude latitude').lean().exec(callback);
};

LocationModel = mongoose.model('Location', LocationSchema);

module.exports.LocationModel = LocationModel;
module.exports.LocationSchema = LocationSchema;
