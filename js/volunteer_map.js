(function(root) {

  var VolunteerMap = function initializeVolunteerMap (data, map) {
    this.stationList = data.stationBeanList;
    this.map = map;
  };

  VolunteerMap.prototype.draw = function draw () {
    var self = this;
    $.each(this.stationList, function(i, station) {
      self.makeMarkerForStation(station);
    });
  };

  VolunteerMap.prototype.makeMarkerForStation = function makeMarker (station) {
    var availableBikes = station.availableBikes;
    var availableDocks = station.availableDocks;
    var stationName = station.stationName;
    var latitude = station.latitude;
    var longitude = station.longitude;
    var self = this;

    var bikeIcon = L.divIcon({
      className: 'icon-wrapper',
      html: '<span class="map-icon map-icon-bicycle-store"><span>'
    });

    if (availableBikes !== 0 && availableDocks !== 0) return null;

    var marker =  L.marker([latitude, longitude], { icon: bikeIcon }).addTo(this.map);

    if (availableBikes === 0) {
      marker.bindPopup('Zero bikes at ' + stationName + '!');
      self.drawLinesForStation(station);
    } else if (availableDocks === 0) {
      marker.bindPopup('Zero docks at ' + stationName + '!');
      self.drawLinesForStation(station);
    };
  };

  VolunteerMap.prototype.drawLinesForStation = function drawLines (station) {
    var self = this;
    var nearest = nearestStationsLookup[station.id];

    var stationCoordinates = new L.LatLng(station.latitude, station.longitude);

    for (i = 0; i < nearest.length; i++) {
      var nearbyStation = nearest[i];
      var nearbyCoordinates = new L.LatLng(nearbyStation.latitude, nearbyStation.longitude);

      var pointList = [stationCoordinates, nearbyCoordinates];

      var line = new L.polyline(pointList, {
        color: 'red',
        weight: 6,
        opacity: 0.75,
        smoothFactor: 1,
      });

      line.addTo(this.map);
    }
  };

  root.VolunteerMap = VolunteerMap;

})(window)
