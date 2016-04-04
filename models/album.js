var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AlbumSchema = new Schema ({
  artistName: String,
  name: String,
  releaseDate: String,
  genres: Array,
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
