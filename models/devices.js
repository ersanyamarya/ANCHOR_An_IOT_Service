const mongoose = require('mongoose');

const devicesSchema = mongoose.Schema({
  node_type: {
    type: String,
    required: true
  },
  fields: {
    type: Number,
    required: true
  },
  dataForm: {
    type: JSON,
    required: true
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
module.exports.getDeviceById = (id, callback) => {
  Device.findById(id, callback);
}
