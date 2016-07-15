(function() {
'use strict';
$('.popup-window').leanModal();

  var genres = {
    "Anarcho Punk": 1,
    "Black Metal": 2,
    "Grindcore": 3,
    "Doom Metal": 4,
    "Thrash Metal": 5,
    "Hardcore Punk": 6,
    "Riot Grrrl": 7
  };

  var $modal = $('#modal1');

  var genre = localStorage.getItem('genre');

  var selectedGenre = 'All';

  $('.genre-selection').on('click', function(event) {

    selectedGenre = event.target.textContent;
    $('#word-cloud').empty();
    renderPlaylistNames(selectedGenre);

    if (selectedGenre === 'All') {
      $('#causticLogo').text('Playlists');
    }
    else{
      $('#causticLogo').text(selectedGenre);
    }
  });

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
          var $playlist = $('<li><a id="playlist-words" class="white-text modal-trigger" href="#modal1">' + playlist.playlist_name + '</a></li>')

          $playlist.on('click', function() {
            getTracks(playlist);
          })

          $('#word-cloud').append($playlist)

        })
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
        playlists.forEach(function(playlist) {
          var $playlist = $('<li><a id="playlist-words"class="white-text modal-trigger" href="#modal1">' + playlist.playlist_name + '</a></li>')

          $playlist.on('click', function() {
            getTracks(playlist);
          })

          $('#word-cloud').append($playlist)

        })
      });

      $xhr.fail(function(err) {
        console.log(err.message);
      });
    }
  };

  var getTracks = function(playlist) {
    var playlistId = playlist.playlist_id;
    var $xhr = $.ajax({
      method: 'GET',
      url: 'playlists/' + playlistId + '/tracks',
      dataType: 'json',
      contentType: 'application/json'
    });

    $xhr.done(function(tracks) {

      var i = 0;
      var output = '';
      var playlistName = playlist.playlist_name;
      // this will work now because we have passed into the current scope
      console.log('playlist name when we want to split it:' + playlist.playlist_name);
      var playlistWords = playlistName.split(' ');
      var trackArray = [];
      playlistWords.forEach(function (word) {
        var trackSubArray = [];
        for (let letter in word) {
          trackSubArray.push(tracks[i]);
          i++;
        }
        trackArray.push(trackSubArray);
      });
      i = 0;

      $('#track-list').empty();

      trackArray.forEach(function(value) {

        output += '<div class="playlist-word">';
        output += '<ul class="track-list">';
        value.forEach(function (track) {
          var trackNm = track.name;
          var firstLtr = trackNm.substr(0,1);
          var remainder = trackNm.substr(1);
          output += '<p id="dynamic-search">';
          output += '<i data-song="' + track.preview_url + '" class="fa fa-play-circle-o fa-3x acrostic-play" aria-hidden="true"></i>';
          output += '<span class="modalText">'
          firstLtr = '<span class="firstLetter">' + firstLtr + '</span>';
          output += firstLtr;
          output += remainder;
          output += '<span id="searchartist"> by ';
          output += track.artist;
          output += '</span>';
          output += '</span>';
          output += '</p>';
          output += '</li>';
        });
        output += '</ul>';
        output += '</div>';

      });

      $('#track-list').html(output);

      var player = new Audio();

      $('.acrostic-play').click(function(event) {
        event.preventDefault();

        player.pause();

        var filename = $(event.target).data('song');
        player.src = filename;
        player.play();

      })

      $('#modal1').openModal();
    })
  }
  renderPlaylistNames(selectedGenre)

})();
