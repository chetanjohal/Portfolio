"use strict";






function goMap () {
  if ($('#map').length) {
        // Styles a map in night mode.
        var myLatlng = {lat: 37.773972, lng: -122.431297};
        var map = new google.maps.Map(document.getElementById('map'), {
          center: myLatlng,
          zoom: 12,

        });
        var infowindow = new google.maps.InfoWindow({
         content: 'Lets Connect!'
       });

        var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
      });
      infowindow.open(map, marker);

  };
};


// Dom Ready Function
jQuery(document).on('ready', function () {
	(function ($) {
		// add your functions
		goMap()
	})(jQuery);
});
