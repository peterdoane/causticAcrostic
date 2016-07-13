(function() {
'use strict';
$('.popup-window').leanModal();


  var genres = {
    "Death Metal": 1,
    "Black Metal": 2,
    "Grindcore": 3,
    "Doom Metal": 4,
    "Thrash Metal": 5,
    "Hardcore Punk": 6,
    "Riot Grrrl": 7
  };

  var genre = localStorage.getItem('genre');

  var selectedGenre = 'All';

  var renderPlaylistNames = function(selectedGenre) {
    if (selectedGenre === 'All') {

      var $xhr = $.ajax({
        method: 'GET',
        url: '/playlists',
        dataType: 'json',
        contentType: 'application/json'
      });

      $xhr.done(function(playlists) {


        playlists.forEach(function(playlist) {
          var $playlist = $('<li><a id="playlist-words"class="white-text modal-trigger" href="#modal1">' + playlist.playlist_name + '</a></li>')

          $playlist.on('click', function() {
            getTracks(playlist.playlist_id);

          })

          $('#word-cloud').append($playlist)



          // Container.append(playlist data)
        })
        // Add event listener to each playlist to trigger renderTracks

      });

      $xhr.fail(function(err) {
        console.log('get playlists xhr error');
      });
    }

    else {
      var $xhr = $.ajax({
        method: 'GET',
        url: '/playlists/' + genres[selectedGenre],
        dataType: 'json',
        contentType: 'application/json'
      });

      $xhr.done(function(playlists) {
        //Render playlist names

        playlists.forEach(function(playlist) {
           // Container.append(playlist data)
           //
        })

        // Add event listener to each playlist to trigger renderTracks
      });

      $xhr.fail(function(error) {
        console.log('xhr get playlists/playlistId error');
      });
    }
  };

  var getTracks = function(playlistId) {
    var $xhr = $.ajax({
      method: 'GET',
      url: 'playlists/' + playlistId + '/tracks',
      dataType: 'json',
      contentType: 'application/json'
    });

    $xhr.done(function(tracks) {
      var $modal = $('<div id="modal1" class="modal"><div class="modal-content"><ul id="track-list" class="fixed"></ul></div></div>');

      $('#word-cloud').append($modal);

      tracks.forEach(function(track) {
        $('#track-list').append($('<li><div><span id="dynamic-search"><i data-song="' + track.preview_url + '" class="fa fa-play-circle-o fa-2x acrostic-play" aria-hidden="true"></i>' + track.name + '<span id="searchartist"> by ' +  track.artist + '</span></span></div></li>'))
      });

      $('#modal1').openModal();
    })
  }
  renderPlaylistNames(selectedGenre)

})();
