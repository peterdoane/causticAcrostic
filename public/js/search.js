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

//$.ajax GET request to '/spotify' when enter is pressed
var $searchInput = $('.search-input-field');

$searchInput.keypress(input, function(event) {
  var key = event.which;

  if (key === 13) {
    // Need to validate string

    var playlistName = $searchInput.text();

    var i = 0;

    const getSpotify = function() {
      if (i === playlistName.length) {
        return;
      }
      var $xhr = $.ajax({
        method: 'GET',
        url: '/spotify',
        dataType: 'json',
        contentType: 'application/json',
        data: {
          letter: playlistName[i],
          genre: WINDOW.genre;
        }

        $xhr.done(function(data) {
          if ($xhr.status !== 200) {
            return console.log('non 200 status');
          }
          // Append songs with artist, track name, and url

          i += 1;
        })

        $xhr.fail(function(err) {
          console.log(err);
        })


    });
  }
});

$save.on('click', function(event) {
  var $xhr = $.ajax({
    method: 'POST',
    url: '/playlists',
    dataType: 'json',
    contentType: 'application/json'
    data: ``//data goes here!
  });
});
//Start with just SAVE PLAYLIST BUTTON

//On change event check to make sure character is a letter
//Then make $.ajax get request to '/spotify?letter=${letter}&genre=${genre}'
//After response comes, append track with play button and artist name

//SAVE PLAYLIST button should make a $.ajax POST playlists

//posts need three parts:
//tracks: [{name: Wound Upon Wound, artist: Gorgoroth, preview_url: metal.com}, etc.]
//genre_id: 3
//name: Open

//SAVE PLAYLIST button should also change the state so that there are two buttons: one for viewing the playlists collection and one for making a new playlist.

})();
