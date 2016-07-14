(function() {
'use strict';

var genres = {
  "Anarcho Punk": 1,
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

var  searchInProgress  = false;

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

    if ($('#collection-button').length == 0){
      $buttonContainer.append('<a id="collection-button" class="waves-effect grey waves-light btn" href="collections.html">View Collection</a><a id="save-button" class="waves-effect grey waves-light btn">Save Playlist</a><a id="newSearch" class="waves-effect grey waves-light btn">Make New</a>');
    }
    $save = $('#save-button');
    activateSave();
    searchInProgress  = false;
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
        searchInProgress = false;
        console.log("search complete");
        return console.log('non 200 status');
      }

      // Append songs with artist, track name, and url
      var $player = $('<div><span id="dynamic-search"><i data-song="' + track.preview_url + '" class="fa fa-play-circle-o fa-2x acrostic-play" aria-hidden="true"></i>' + track.name + '<span id="searchartist"> by ' +  track.artist + '</span></span></div>');

      if (playlistName[index + spaces] === ' ') {
        $playlistContainer.append($('<div id="dynamic-search" class="invisible">invisible</div>'));

        spaces += 1;
     }

      playlistData.tracks.push(track);

      $playlistContainer.append($player);

      getSpotify(index + 1, playlist);
    });

    $xhr.fail(function(err) {
      searchInProgress = false;
      console.log("search error");
      console.log(err);
    });

};


$searchInput.keypress(function(event) {

  var range = function(number){
    console.log(number);
  	if(number == 13 || number > 64 && number < 90 || number > 96 && number < 122){
  		return false;
  	} else{
  	return true;
  	}
  }

  var key = event.which;
  if(range(key)){
    Materialize.toast('Letters Only!', 8000)
    return;
  }

  if (key !== 13) {
    return;
  }

  event.preventDefault();

    // Need to validate string

  if(searchInProgress == false){

    console.log("search function called");
    searchInProgress = true;

    inActivePage();

    $playlistContainer.html('');

    playlistName = $searchInput.val().toUpperCase();
    var withoutSpaces = playlistName.split(' ').join('')

    getSpotify(0, withoutSpaces);
    playlistData.name = playlistName;
    playlistData.genre_id = genres[genre];
  }

});

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

var inActivePage = function() {
  $('.search-input-field').addClass('blurredElement');
  $('.search-input-field').prop('disabled', true);

};

//it will remove the blur effect and enable the input bar
var activePage = function() {
  $('.search-input-field').removeClass('blurredElement');
  $('.search-input-field').prop('disabled', false);

};


$(document).on('click', "#newSearch", function () {
  activePage();
});
})();
