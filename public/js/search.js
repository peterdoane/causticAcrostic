(function() {
'use strict';

var genres = {
  "Death Metal": 1,
  "Black Metal": 2,
  "Grindcore": 3,
  "Doom Metal": 4,
  "Thrash Metal": 5,
  "Hardcore Punk": 6,
  "Riot Grrrl": 7
};
var playlistName;
var genre = localStorage.getItem('genre');

var spaces = 0;

var $save;

var $searchInput = $('.search-input-field');

var $playlistContainer = $('#playlist-container');

var playlistData = {tracks: []};

const getSpotify = function(index, playlist) {
  if (index === playlist.length) {

    var player = new Audio();

    $('.acrostic-play').click(function(event) {
      event.preventDefault();

      player.pause();

      var filename = $(event.target).data('song');
      player.src = filename;
      player.play();

    })
    var $buttonContainer = $('#both_buttons');

    event.preventDefault();

    if ($('#collection-button').length == 0) {
      $buttonContainer.append('<a id="collection-button"class="waves-effect grey waves-light btn" href="collections.html">View Collection</a>',
      '<a id="save-button" class="waves-effect grey waves-light btn" >Save Playlist</a>');
    }

    $save = $('#save-button');
    activateSave();

    return;
  }

  var $xhr = $.ajax({
    method: 'GET',
    url: '/spotify',
    dataType: 'json',
    contentType: 'application/json',
    data: {
      letter: playlist[index],
      genre: genre
    }
    });

    $xhr.done(function(track) {
      if ($xhr.status !== 200) {
        return console.log('non 200 status');
      }

      // Append songs with artist, track name, and url
      var $player = $('<div><span id="dynamic-search"><i data-song="' + track.preview_url + '" class="fa fa-play-circle-o fa-2x acrostic-play" aria-hidden="true"></i>' + track.name + '<span id="searchartist"> by ' +  track.artist + '</span></span></div>');

      if (playlistName[index + spaces] === ' ') {
        $playlistContainer.append($('<div id="dynamic-search" class="invisible">invisible</div>'))

        spaces += 1;
      }

      playlistData.tracks.push(track);

      $playlistContainer.append($player);


      getSpotify(index + 1, playlist);
    });

    $xhr.fail(function(err) {
      console.log(err);
    });

};



var activateSave = function() {
  $save.on('click', function(event) {
    var $xhr = $.ajax({
      method: 'POST',
      url: '/playlists',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(playlistData)
    });

    $xhr.done(function(response) {
      console.log('success');
    });

    $xhr.fail(function(error) {
      console.log(error);
    })
  });
};


$searchInput.keypress(function(event) {
  var key = event.which;
  if (key !== 13) {
    return;
  }
  event.preventDefault();
  $playlistContainer.empty();

    // Need to validate string
  playlistName = $searchInput.val().toUpperCase();

  var withoutSpaces = playlistName.split(' ').join('');
  getSpotify(0, withoutSpaces);

  playlistData.name = playlistName;
  playlistData.genre_id = genres[genre];
});


})();
