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
