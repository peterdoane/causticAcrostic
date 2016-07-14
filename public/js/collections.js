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
            getTracks(playlist.playlist_id);
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
            getTracks(playlist.playlist_id);
          })

          $('#word-cloud').append($playlist)

        })
      });

      $xhr.fail(function(err) {
        console.log(err.message);
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

      $('#track-list').empty();

      var htmlArr = tracks.map(function(track) {
        var trackNm = track.name.split('');
        var firstLtr = trackNm[0];
        trackNm.shift();
        var nme = trackNm.join('');
        return '<li>' +
        '<p id="dynamic-search">' +
        '<i data-song="' + track.preview_url + '" class="fa fa-play-circle-o fa-3x acrostic-play" aria-hidden="true"></i>' +
        '<span class="modalText">' + '<span class="firstLetter">'+ firstLtr + '</span>' +
        nme +
        '<span id="searchartist"> by ' + track.artist + '</span>' +
        '</span>' +
        '</p>' +
        '</li>';
      });

      var html = htmlArr.join('');

      $('#track-list').html(html);

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
