var jsonTracksList = [
  {
    letter:'A',
    track_name: 'ngel from Montgomery',
    artist: ' by Megadeth'
  },
  {
    letter:'C',
    track_name: 'udgel',
    artist: ' by Borgore'
  },
  {
    letter:'R',
    track_name:'ussian Roullette',
    artist:' by Goat Horder'
  },
  {
    letter:'O',
    track_name:'din',
    artist:' by Flesh Smeller'
  },
  {
    letter:'S',
    track_name:'ordid Sheets',
    artist:' by Carcass'
  },
  {
    letter:'T',
    track_name:'imetable',
    artist:' by Pig Destroyer'
  },
  {
    letter:'I',
    track_name:'onic',
    artist:' by The Elves'
  },
  {
    letter:'C',
    track_name:'omic Sans',
    artist:' by The Grave Robbers'
  }


];


  $('#acrostic').append(`<ul id='special'></ul>`);
  $.each(jsonTracksList, (i, item) => {
    var liNew = $(`<li></li>`);
    liNew.css('opacity', '0.0');
    liNew.append(`<span class='acrosticLetter'>${item.letter}</span>`);
    liNew.append(`<i class="fa fa-play-circle-o fa-2x acrostic-play" aria-hidden="true"></i>`);

    liNew.append(`<span class='acrosticLetter' id='track_name'>${item.track_name}</span>`);
    liNew.append(`<span class='acrosticLetter' id='track_name'>${item.artist}</span>`);
    $('#special').append(liNew);
  });
