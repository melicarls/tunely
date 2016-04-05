/************
 * DATABASE *
 ************/

 var db = require('../models');
 var bodyParser = require('body-parser');

function create(req, res) {
  console.log("Reached create song route.");
  console.log("Params" + req.params.album_id);
  console.log("Body" + req.body.name);
  db.Album.findById(req.params.album_id, function(err, foundAlbum){
    if (err) {
      res.status(404).json({error: err.message});
    }
    var newSong = new db.Song(req.body);
    foundAlbum.songs.push(newSong);
    foundAlbum.save(function(err, savedAlbum) {
      if (err) {
        return console.log("Save error:", err);
      }
      res.json(savedAlbum);
    });
  });
}


// export public methods here
module.exports = {
  create: create,
};
