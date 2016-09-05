$(function() {
  var map = L.map('map').setView([41.89, -87.61], 12);

  var layer = new L.StamenTileLayer("toner-lite");
  map.addLayer(layer);

  $.ajax({
    url: 'http://www.divvybikes.com/stations/json/',
    success: function (data) {
      var volunteerMap = new VolunteerMap(data, map);
      volunteerMap.draw();
    }
  });
});
