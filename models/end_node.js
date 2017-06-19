const mongoose = require('mongoose');

const end_nodesSchema = mongoose.Schema({
  user_key: {
    type: String,
    required: true
  },
  device_key: {
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
const End_Nodes = module.exports = mongoose.model('End_Nodes', end_nodesSchema);

module.exports.addEnd_Node = (end_node, callback) => {
  End_Nodes.create(end_node, callback);
}
module.exports.getEnd_Nodes = (callback, limit) => {
  End_Nodes.find(callback).limit(limit);
}
module.exports.getEnd_NodesByUser = (user, callback) => {
  End_Nodes.find({
    user_key: user
  }, callback);
}
module.exports.getEnd_NodesByUserAndId = (user, id, callback) => {
  End_Nodes.find({
    user_key: user,
    _id: id
  }, callback);
}
module.exports.getEnd_NodesByUserAndDevice = (user, device, callback) => {
  End_Nodes.find({
    user_key: user,
    device_key: device
  }, callback);
}
module.exports.getEnd_NodesById = (id, callback) => {
  End_Nodes.findById(id, callback);
}

module.exports.updateEnd_Node = (id, end_node, options, callback) => {
  var query = {
    _id: id
  };
  var update = {
    payload: {
      field1: end_node.payload.field1,
      field2: end_node.payload.field2,
      field3: end_node.payload.field3,
      field4: end_node.payload.field4,
      field5: end_node.payload.field5
    }
  }
  End_Nodes.findOneAndUpdate(query, update, options, callback);
}

// Delete Book
module.exports.removeEnd_Nodes = (id, callback) => {
  var query = {
    _id: id
  };
  End_Nodes.remove(query, callback);
}
