/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */

var template;
var $albumsList;
var sampleAlbums = [];

/* hard-coded data! */
sampleAlbums.push({
             artistName: 'Ladyhawke',
             name: 'Ladyhawke',
             releaseDate: '2008, November 18',
             genres: [ 'new wave', 'indie rock', 'synth pop' ]
           });
sampleAlbums.push({
             artistName: 'The Knife',
             name: 'Silent Shout',
             releaseDate: '2006, February 17',
             genres: [ 'synth pop', 'electronica', 'experimental' ]
           });
sampleAlbums.push({
             artistName: 'Juno Reactor',
             name: 'Shango',
             releaseDate: '2000, October 9',
             genres: [ 'electronic', 'goa trance', 'tribal house' ]
           });
sampleAlbums.push({
             artistName: 'Philip Wesley',
             name: 'Dark Night of the Soul',
             releaseDate: '2008, September 12',
             genres: [ 'piano' ]
           });
/* end of hard-coded data */



$(document).ready(function() {
  console.log('app.js loaded!');

  $albumsList = $('#albumTarget');

  var source = $('#albums-template').html();
  template = Handlebars.compile(source);

  sampleAlbums.forEach(function(album){
    renderAlbum(album);
  });

  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: handleSuccess,
    error: handleError,
  });

  $('#album-form form').on('submit', function(e) {
    e.preventDefault();
    var newAlbumName = $('#name').val();
    var newArtistName = $('#textinput').val();
    var newReleaseDate = $('#releaseDate').val();
    var genreString = $('#genres').val();
    var newGenres = genreString.split(" , ");
    $.ajax({
      method: 'POST',
      url: '/api/albums',
      data: {
        name: newAlbumName,
        artistName: newArtistName,
        releaseDate: newReleaseDate,
        genres: newGenres,
      },
      success: newAlbumSuccess,
      error: newAlbumError,
    });
  });

//End document ready
});

function handleSuccess(json) {
  console.log(json);
  json.forEach(function(album){
    renderAlbum(album);
  })
;}

function handleError() {
  console.log("Handle error was triggered");
  $('#albumTarget').text("Failed to load albums. Something went wrong... check your server.");
}

function newAlbumSuccess(json) {
  console.log(json);
  $('#album-form').val('');
  renderAlbum(json);
}

function newAlbumError() {
  console.log("The album was not created successfully.");
}

function renderAlbum(album) {
  console.log('rendering albums');
  var albumHtml = $('#albums-template').html();
  var albumsTemplate = Handlebars.compile(albumHtml);
  var html = albumsTemplate(album);
  $('#albumTarget').prepend(html);
}
