var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

End_Node = require('../models/end_node');
Device = require('../models/devices');
User = require('../models/user');
//--Remove This after testing--------------
router.get('/', (req, res) => {
  End_Node.getEnd_Nodes((err, end_node) => {
    if (err) {
      throw err;
    } else res.json(end_node);
  });
});

router.get('/:_id', (req, res) => {
  End_Node.getEnd_NodeById(req.params._id, (
    err,
    device) => {
    if (err) {
      console.log("Some Error");
      res.send('End_Node Not found');
    } else res.json(device);
  });

});
router.get('/byuser/:_user', (req, res) => {
  End_Node.getEnd_NodesByUser(req.params._user, (err, end_node) => {
    if (err) {
      console.log("Some Error");
      res.send('End_Node Not found');
    } else res.json(end_node);
  });
});

router.get('/bydevice/:_device', (req, res) => {
  End_Node.getEnd_NodesByDevice(req.params._device, (err, end_node) => {
    if (err) {
      console.log("Some Error");
      res.send('Device Not found');
    } else res.json(end_node);
  });
});

router.post('/', (req, res) => {
  var end_node = req.body;
  if (!end_node.user_key || !end_node.device_key || !end_node.metadata.end_node_type ||
    !end_node.metadata.end_node_name) {
    res.send(`The data dosen't seems to be right....!`);
  } else {
    User.getUserById(end_node.user_key, (err, user) => {
      if (err) {
        res.send('user not found');
        console.error(err);
      } else {
        Device.getDeviceById(end_node.device_key, (err, device) => {
          if (err) {
            res.send('device not found');
            console.log(err);
          } else {
            End_Node.addEnd_Node(end_node, (err, end_node) => {
              if (err) console.error(err);
              res.send("Your API-KEY is: " + end_node.id +
                "\nKeep this safe, it will be used to receive and send data on your end_node"
              );
            });
          }
        });
      }
    });
  }
});

router.put('/:_id', (req, res) => {
  var id = req.params._id;
  var end_node = req.body;
  End_Node.updateEnd_Node(id, end_node, {}, (err, end_node) => {
    if (err) {
      throw err;
    } else res.json(end_node);
  });

});
module.exports = router;
