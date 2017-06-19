var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

Device = require('../models/devices');
User = require('../models/user')
router.get('/', (req, res) => {
  Device.getDevice((err, device) => {
    if (err) {
      throw err;
    } else res.json(device);
  });
});

router.get('/:_user/:_id', (req, res) => {
  User.getUserById(req.params._user, (err, user) => {
    if (err) {
      res.send('user not found');
      console.error(err);
    } else {
      Device.getDeviceByUserAndId(req.params._user, req.params._id, (
        err,
        device) => {
        if (err) {
          console.log("Some Error");
          res.send('Device Not found');
        } else res.json(device);
      });
    }
  });
});

router.get('/:_user', (req, res) => {
  User.getUserById(req.params._user, (err, user) => {
    if (err) {
      res.send('user not found');
      console.error(err);
    } else {
      Device.getDeviceByUser(req.params._user, (err, device) => {
        if (err) {
          console.log("Some Error");
          res.send('Device Not found');
        } else res.json(device);
      });
    }
  });

});

router.post('/', (req, res) => {
  var device = req.body;
  if (!device.metadata.type || !device.metadata.name || !device.location ||
    !device.author) {
    res.send(`The data dosen't seems to be right....!`);
  } else {
    User.getUserById(device.user_key, (err, user) => {
      if (err) {
        res.send('user not found');
        console.error(err);
      } else {
        Device.addDevice(device, (err, device) => {
          if (err) console.error(err);
          res.send("Your API-KEY is: " + device.id +
            "\nKeep this safe, it will be used to receive and send data on your device\nOwned by: " +
            device.author
          );
        });
      }
    });
  }
});

router.put('/:_id', (req, res) => {
  var id = req.params._id;
  var device = req.body;
  if (!device.sensor_type || !device.location || !device.author) {
    res.send(`The data dosen't seems to be right....!`);
  } else {
    Device.updateDevice(id, device, {}, (err, device) => {
      if (err) {
        throw err;
      } else res.json(device);
    });
  }
});
module.exports = router;
