const mongoose = require('mongoose');
const dataSchema = mongoose.Schema({
  end_node_key: {
    type: String,
    required: true
  },
  device_key: {
    type: String,
    required: true
  },
  user_key: {
    type: String,
    required: true
  },
  payload: {
    field1: String,
    field2: String,
    field3: String,
    field4: String,
    field5: String
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
  // module.exports.getDataByUser = (user, callback) => {
  //   Data.find({
  //     user_key: user
  //   }, callback);
  // }
  // module.exports.getDataByDevice = (device, callback) => {
  //   Data.find({
  //     device_key: device
  //   }, callback);
  // }
module.exports.getDataByEndNode = (endnode, callback) => {
  Data.find({
    end_node_key: endnode
  }, callback);
}
module.exports.removeData = (id, callback) => {
  var query = {
    _id: id
  };
  Data.remove(query, callback);
}
