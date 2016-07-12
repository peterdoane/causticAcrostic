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

var genre = WINDOW.genre;

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
