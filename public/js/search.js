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

Window.genre = 'Grindcore';

var $save;

var $searchInput = $('.search-input-field');

var $playlistContainer = $('#playlist-container');

var playlistData = {tracks: []};

var  searchInProgress  = false;



const getSpotify = function(index, playlistName) {


  if (index === playlistName.length) {
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
    searchInProgress  = false;
    return;
  }

  var $xhr = $.ajax({
    method: 'GET',
    url: '/spotify',
    dataType: 'json',
    contentType: 'application/json',
    data: {
      letter: playlistName[index],
      genre: 'grindcore' //Window.genre
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

      playlistData.tracks.push(track);

      $playlistContainer.append($player);

      getSpotify(index + 1, playlistName);
    });

    $xhr.fail(function(err) {
      searchInProgress = false;
      console.log("search error");
      console.log(err);
    });

};


$searchInput.keypress(function(event) {
  var key = event.which;
  if (key !== 13) {
    return;
  }
  event.preventDefault();
  $save = $('#save-button');
  activateSave();

    // Need to validate string

  if(searchInProgress == false){

    console.log("search function called");
    searchInProgress = true;

    inActivePage();

    $playlistContainer.html('');
    var playlistName = $searchInput.val().toUpperCase();
    getSpotify(0, playlistName);
    playlistData.name = playlistName;
    playlistData.genre_id = genres[Window.genre];
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

var getQueryVariable = function(variable) {

    //window.location.search would be something like this ?s=abcd
    //remove '?' from the parameter
    //window.location.search contains first character as '?'
    var query = window.location.search.substring(1);
    var vars = query.split('&'); //split
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');

        //decodeURIComponent is a standard js method which decodes a URI component
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

//it will add a blur effect to the page and also disable the input bar
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


//get the search params from the url
var search = getQueryVariable('s');
if (search){
  var playlistNameGlobal = search.toUpperCase();
  getSpotify(0, playlistNameGlobal);
}


//Start with just SAVE PLAYLIST BUTTON

//On change event check to make sure character is a letter
//Then make $.ajax get request to '/spotify?letter=${letter}&genre=${genre}'
//After response comes, append track with play button and artist name

//SAVE PLAYLIST button should make a $.ajax POST playlists

//SAVE PLAYLIST button should also change the state so that there are two buttons: one for viewing the playlists collection and one for making a new playlist.

})();
