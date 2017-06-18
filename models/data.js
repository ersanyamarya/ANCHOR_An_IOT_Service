const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
  API_KEY: {
    type: String,
    required: true
  },
  actData: {
    type: JSON,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});
const Data = module.exports = mongoose.model('Data', dataSchema);

module.exports.addData = (data, callback) => {
  Data.create(data, callback);
}
module.exports.getData = (callback, limit) => {
  Data.find(callback).limit(limit);
}
module.exports.getDataById = (id, callback) => {
  Data.findById(id, callback);
}
