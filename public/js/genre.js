(function() {
  'use strict';

  $('a').on('click', function(event) {
    localStorage.setItem('genre', event.target.textContent);
  });
})();
