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

var $save = $('#save-button');

var $searchInput = $('.search-input-field');

var $playlistContainer = $('#playlist-container');

const getSpotify = function(index, playlistName) {
  if (index === playlistName.length) {
    return;
  }
  var $xhr = $.ajax({
    method: 'GET',
    url: '/spotify',
    dataType: 'json',
    contentType: 'application/json',
    data: {
      letter: playlistName[index],
      genre: 'grindcore'
    }
    });

    $xhr.done(function(track) {
      if ($xhr.status !== 200) {
        return console.log('non 200 status');
      }
      // Append songs with artist, track name, and url
      var $player = $('<div><span id="dynamic-search"><i data-song="' + track[0].preview_url + '" class="fa fa-play-circle-o fa-2x acrostic-play" aria-hidden="true"></i>' + track[0].name + '<span id="acrostic-artist"> by' +  track[0].artist + '</span></span></div>');

      $playlistContainer.append($player);
      getSpotify(index + 1, playlistName);
    });

    $xhr.fail(function(err) {
      console.log(err);
    });

};

$searchInput.keypress(function(event) {
  var key = event.which;
  if (key !== 13) {
    return;
  }
  event.preventDefault();

    // Need to validate string
  var playlistName = $searchInput.val().toUpperCase();
  getSpotify(0, playlistName);
});

$save.on('click', function(event) {
  // var $xhr = $.ajax({
  //   method: 'POST',
  //   url: '/playlists',
  //   dataType: 'json',
  //   contentType: 'application/json'
  //   data: ``//data goes here!
  // });
  console.log('hello');
});
//Start with just SAVE PLAYLIST BUTTON

//On change event check to make sure character is a letter
//Then make $.ajax get request to '/spotify?letter=${letter}&genre=${genre}'
//After response comes, append track with play button and artist name

//SAVE PLAYLIST button should make a $.ajax POST playlists

//SAVE PLAYLIST button should also change the state so that there are two buttons: one for viewing the playlists collection and one for making a new playlist.

})();
