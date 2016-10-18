$(function() {
  var map = L.map('map').setView([41.89, -87.61], 12);

  var layer = new L.StamenTileLayer("toner-lite");
  map.addLayer(layer);

  mapTitle = L.control({ position: 'topright' });

  mapTitle.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this._div.innerHTML = '<div id="title">Divvy Volunteer Brigade</div>';

    return this._div;
  };

  mapTitle.addTo(map);

  $.ajax({
    url: 'http://www.divvybikes.com/stations/json/',
    success: function (data) {
      var volunteerMap = new VolunteerMap(data, map);
      volunteerMap.draw();
    }
  });
});
