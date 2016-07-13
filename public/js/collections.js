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
          $('#word-cloud').append($('<li><a id="playlist-words"class="white-text popup-window" href="#modal1">' + playlist.playlist_name + '</a></li>'))


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

  var renderTracks = function(playlistId) {
    var $xhr = $.ajax({
      method: 'GET',
      url: 'playlists/' + playlistId + '/tracks',
      dataType: 'json',
      contentType: 'application/json'
    });

    $xhr.done(function(tracks) {
      //render modal
    })
  }
  renderPlaylistNames(selectedGenre)

})();
