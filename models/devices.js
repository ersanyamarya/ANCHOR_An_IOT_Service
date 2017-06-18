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
    },
    cpu_metadata: {
      type: JSON,
      required: true
    }
  },
  fields: {
    type: Number,
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
