const mongoose = require('mongoose');

const devicesSchema = mongoose.Schema({
  user_key: {
    type: String,
    required: true
  },
  metadata: {
    type: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  location: {
    type: String,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  },
  author: {
    type: String,
    required: true
  }
});
const Device = module.exports = mongoose.model('Device', devicesSchema);

module.exports.addDevice = (device, callback) => {
  Device.create(device, callback);
}
module.exports.getDevice = (callback, limit) => {
  Device.find(callback).limit(limit);
}
module.exports.getDeviceByUser = (user, callback) => {
  Device.find({
    user_key: user
  }, callback);
}
module.exports.getDeviceByUserAndId = (user, id, callback) => {
  Device.find({
    user_key: user,
    _id: id
  }, callback);
}
module.exports.getDeviceById = (id, callback) => {
  Device.findById(id, callback);
}

module.exports.updateDevice = (id, device, options, callback) => {
  var query = {
    _id: id
  };
  var update = {
    metadata: {
      type: device.metadata.type,
      name: device.metadata.name
    },
    location: device.location,
    author: device.author
  }
  Device.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeDevice = (id, callback) => {
  var query = {
    _id: id
  };
  Device.remove(query, callback);
}
