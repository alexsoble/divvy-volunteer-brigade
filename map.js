$(function() {
  var map = L.map('map').setView([41.89, -87.61], 12);

  var layer = new L.StamenTileLayer("toner-lite");
  map.addLayer(layer);

  var bikeIcon = L.divIcon({
    className: 'icon-wrapper',
    html: '<span class="map-icon map-icon-bicycling"><span>'
  });

  function handleStationData (data) {
    var stationList = data.stationBeanList;
    $.each(stationList, function(i, station) {
      makeMarkerForStation(station);
    });
  };

  function makeMarkerForStation (station) {
    var availableBikes = station.availableBikes;
    var availableDocks = station.availableDocks;
    var stationName = station.stationName;
    var latitude = station.latitude;
    var longitude = station.longitude;

    if (availableBikes !== 0 && availableDocks !== 0) return null;

    var marker =  L.marker([latitude, longitude], { icon: bikeIcon }).addTo(map);

    if (availableBikes === 0) {
      marker.bindPopup('Zero bikes at ' + stationName + '!');
    } else if (availableDocks === 0) {
      marker.bindPopup('Zero docks at ' + stationName + '!');
    };
  }

  $.ajax({
    url: 'http://www.divvybikes.com/stations/json/',
    success: handleStationData
  });
});
