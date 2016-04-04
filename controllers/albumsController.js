/************
 * DATABASE *
 ************/

 var db = require('../models');
 var bodyParser = require('body-parser');

// GET /api/albums
function index(req, res) {
  console.log("Get/api/albums has been reached");
  db.Album.find({}, function(err, allAlbums) {
      if (err) {
        return console.log("Error: ", err);
      }
      res.json(allAlbums);
    });
}

function create(req, res) {
  console.log("Post /api/albums has been reached");
  var newAlbum = new db.Album(req.body);
  newAlbum.save(function handleAlbumSave(err, savedAlbum){
    if (err) {
      return console.log("Error ", err);
    }
    res.json(savedAlbum);
  });
}

function show(req, res) {
  // FILL ME IN !
}

function destroy(req, res) {
  // FILL ME IN !
}

function update(req, res) {
  // FILL ME IN !
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
