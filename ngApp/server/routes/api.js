var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Video = require('../models/video');

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

router.get('/videos', (req, res) => {
  console.log('vidoes routes');
  Video.find({}, (err, videos) => {
    if(err) {
      res.json({'err': err});
    } else {
      res.json(videos);
    }
  });
});

router.get('/videos/:id', (req, res) => {
  console.log('vidoes routes');
  Video.findById(req.params.id, (err, videos) => {
    if(err) {
      res.json({'err': err});
    } else {
      res.json(videos);
    }
  });
});

router.post('/video', (req, res) => {
  var video = new Video(req.body);
  video.save((err, video) => {
    if(err) {
      res.json({"err": err});
    } else {
      res.json(video)
    }
  });
});

router.put('/video/:id', (req, res) => {
  Video.findById(req.params.id, (err, video) => {
    if(err) {
      res.json({'err': err});
    } else {
      if(req.body.title) video.title = req.body.title;
      if(req.body.description) video.description = req.body.description;
      if(req.body.url) video.url = req.body.url;
      video.save((err, video) => {
        if(err) {
          res.json({'err' : err});
        } else {
          res.json(video);
        }
      });
    }
  });
});

module.exports = router;
