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
var player = document.createElement('audio')  //new Audio();

var $save;
var withoutSpaces;

var $searchInput = $('.search-input-field');

var $playlistContainer = $('#playlist-container');

var playlistData = {tracks: []};

var searchInProgress  = false;

$searchInput.keypress(function(event) {

  var range = function(number){
  	if(number == 13 || number == 32 || number > 64 && number < 90 || number > 96 && number < 123){
  		return false;
  	} else{
  	return true;
  	}
  }

  var key = event.which;
  if(range(key)){
    Materialize.toast('Letters Only Knucklehead!', 1000);
    var audio = new Audio('images/dethbleep.mp3');
    audio.play();
    return;
  }

  if (key !== 13) {
    return;
  }

  event.preventDefault();

    // Need to validate string

  if(searchInProgress == false){

    searchInProgress = true;

    inActivePage();

    $playlistContainer.html('');

    playlistName = $searchInput.val().toUpperCase();
    withoutSpaces = playlistName.split(' ').join('')

    getSpotify(0, withoutSpaces);
    playlistData.name = playlistName;
    playlistData.genre_id = genres[genre];
  }

});

const getSpotify = function(index, playlist) {
  console.log(index);
  if (index === playlist.length) {

    var $buttonContainer = $('#both_buttons');
    event.preventDefault();

    var collectionButton = '<a id="collection-button" class="waves-effect grey waves-light btn" href="collections.html">View Collection</a>';
    var saveButton = '<a id="save-button" class="center-align waves-effect grey waves-light btn">Save Playlist</a>';
    var makeNewButton = '<a id="newSearch" class="waves-effect grey waves-light btn">Make New</a>';

    if ($('#collection-button').length == 0){
      $buttonContainer.append(saveButton);

    }
    $save = $('#save-button');
    activateSave(function(){

      $buttonContainer.html(collectionButton + makeNewButton);

    });

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
      appendTrack(track, index);
    });

    $xhr.fail(function(err) {
      searchInProgress = false;
      getFallback(playlist[index], index);
    });

};

var appendTrack = function(track, index) {

  var name = track.name.substring(0, 20);
  var artist = track.artist.substring(0, 15);

  if (track.name.length > 20) {
    name += '...';
  }
  if (track.artist.length > 15) {
    artist += '...';
  }

  // Append songs with artist, track name, and url
  var $player = $('<div class="track-wrapper"><span id="dynamic-search"><i data-song="' + track.preview_url + '" class="fa fa-play-circle-o fa-2x acrostic-play" aria-hidden="true"></i>' + name + '<span id="searchartist"> by ' + artist + '</span></span><p class="track-info">' + track.name + ' by ' + track.artist + '</p></div>');

  if (playlistName[index + spaces] === ' ') {
    $playlistContainer.append($('<div id="dynamic-search" class="invisible">invisible</div>'));

     spaces += 1;
  }

  playlistData.tracks.push(track);
  $playlistContainer.append($player);

  $('.acrostic-play').click(function(event) {
    event.preventDefault();

    var $track = $(event.target)

    if ($track.hasClass('playing')) {
      player.pause()
      $track.removeClass('playing');
    }

    else if ($('.acrostic-play').hasClass('playing')) {
      player.pause()
      $('.playing').removeClass('playing');

      window.setTimeout(function() {
        var filename = $track.data('song');
        player.src = filename;
        player.play();
        $track.addClass('playing');
      }, 200);
    }
    else {
      var filename = $(event.target).data('song');
      player.src = filename;
      player.play();
      $track.addClass('playing');
    }
  });

  getSpotify(index + 1, withoutSpaces);
};

var getFallback = function(letter, index) {
  var $xhr = $.ajax({
    method: 'GET',
    url: '/tracks',
    dataType: 'json',
    contentType: 'application/json',
    data: {
      letter: letter
    }
  });

  $xhr.done(function(track) {
    appendTrack(track, index);
  });

  $xhr.fail(function(err) {
    console.log('Uh oh');
  })
};

var activateSave = function(callback) {
  $save.on('click', function(event) {
    console.log(playlistData);
    var $xhr = $.ajax({
      method: 'POST',
      url: '/playlists',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(playlistData)
    });

    $xhr.done(function(response) {
      console.log('success');
      callback();
    });

    $xhr.fail(function(error) {
      console.log(error);
      //
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
  $('.search-input-field').val('');
  $('#playlist-container').empty();
  $('#collection-button').remove();
  $('#newSearch').remove();
  activePage();
});
})();
