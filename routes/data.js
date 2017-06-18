var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

Data = require('../models/data');
router.get('/', (req, res) => {
  Data.getData((err, data) => {
    if (err) {
      throw err;
    } else res.json(data);
  });
});

router.get('/:_id', (req, res) => {
  Data.getDataById(req.params._id, (err, data) => {
    if (err) {
      console.log("Some Error");
      res.send(`This Data does not exist`);
    } else res.json(data);
  });
});

router.post('/', (req, res) => {
  var data = req.body;
  if (!data.API_KEY || !data.actData) {
    res.send(`The data dosen't seems to be right....!`);

  } else {
    Data.addData(data, (err, data) => {
      if (err) {
        console.error(err);
      }
      res.send("Data received sucessfully....!\n");
    });
  }
});

router.put('/:_id', (req, res) => {
  var id = req.params._id;
  var data = req.body;
  if (!data.temperature || !data.humidity) {
    res.send(`The data dosen't seems to be right....!`);
  } else {
    Data.updateData(id, data, {}, (err, data) => {
      if (err) {
        throw err;
      } else res.json(data);
    });
  }
});
module.exports = router;
