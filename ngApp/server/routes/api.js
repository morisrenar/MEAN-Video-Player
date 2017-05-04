var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var db = "localhost:27017/videoplayer";
mongoose.Promise = global.Promise;

mongoose.connect(db, (err) => {
  if(err) {
    console.log("error in connecting database: " + err);
  } else {
    console.log("Database connected successfully: " + db);
  }
});

router.get('/', (req, res) => {
   res.send('api works');
});

module.exports = router;
