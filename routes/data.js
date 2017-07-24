var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

Data = require('../models/data');
End_Node = require('../models/end_node');
Device = require('../models/devices');
User = require('../models/user');
//--Remove This after testing--------------
router.get('/', (req, res) => {
  Data.getData((err, data) => {
    if (err) {
      throw err;
    } else res.json(data);
  });
});
//---------------------------------------------
router.get('/:_id', (req, res) => {
  Data.getDataById(req.params._id, (err, data) => {
    if (err) {
      console.log("Some Error");
      res.send(`This Data does not exist - `);
    } else res.json(data);
  });
});

router.get('/byendnode/:_endnode', (req, res) => {
  Data.getDataByEndNode(req.params._endnode, (err, end_node) => {
    if (err) {
      console.log("Some Error");
      res.send('End Node Not found');
    } else res.json(end_node);
  });
});

router.post('/', (req, res) => {
  var data = req.body;
  if (!data.end_node_key || !data.device_key || !data.user_key || !data.payload) {
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
module.exports = router;
