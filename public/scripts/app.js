/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */

var template;
var $albumsList;

$(document).ready(function() {
  console.log('app.js loaded!');

  $albumsList = $('#albumTarget');

  var source = $('#albums-template').html();
  template = Handlebars.compile(source);


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
    var newGenres = genreString.split(",");
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

  $('#albumTarget').on('click', '.add-song', function(e) {
    console.log("Clicked add song.");
    var thisAlbumId = $(this).closest('.album').data('album-id');
    console.log("Id", thisAlbumId);
    $('#songModal').data('album-id', thisAlbumId);
    $('#songModal').modal();
  });

  $('#saveSong').on('click', handleNewSongSubmit);

//End document ready
});

function handleNewSongSubmit(e) {
  console.log("New song submit triggered");
  e.preventDefault();
  var newSongName = $('#songName').val();
  var newTrackNumber = $('#trackNumber').val();
  var thisAlbumId = $('#songModal').data('albumId');
  var thisUrl = "/api/albums/" + thisAlbumId + "/songs";
  $.ajax ({
    method: 'POST',
    url: thisUrl,
    data: {
      name: newSongName,
      trackNumber: newTrackNumber,
    },
    success: newSongSuccess,
    error: newSongError,
  });
}

function newSongSuccess(data) {
  console.log("Got this data from POST" + data);
  $('#songName').val("");
  $('#trackNumber').val("");
  $('#songModal').modal('hide');
  var thisAlbumId = $('#songModal').data('albumId');
  $.get('/api/albums/'+thisAlbumId, function(data) {
    $('[data-album-id=' + thisAlbumId +']').remove();
    renderAlbum(data);
  });
}

function newSongError(err) {
  console.log('Post request returned this error:', err);
}

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
