var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

Device = require('../models/devices');
router.get('/', (req, res) => {
  Device.getDevice((err, device) => {
    if (err) {
      throw err;
    } else res.json(device);
  });
});

router.get('/:_id', (req, res) => {
  Device.getDeviceById(req.params._id, (err, device) => {
    if (err) {
      console.log("Some Error");
      res.send(
        '<h1>Device Not found</h1><h2>Id not registered</h2>'
      );
    } else res.json(device);
  });
});

router.post('/', (req, res) => {
  var device = req.body;
  if (!device.node_type || !device.location || !device.fields || !device.dataForm ||
    !device.author) {
    res.send(`The data dosen't seems to be right....!`);
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
