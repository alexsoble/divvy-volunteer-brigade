(function(root) {

  var VolunteerMap = function initializeVolunteerMap (data, map) {
    this.stationList = data.stationBeanList;
    this.map = map;
  }

  VolunteerMap.prototype.draw = function draw () {
    var self = this;
    $.each(this.stationList, function(i, station) {
      self.makeMarkerForStation(station);
    });
  }

  VolunteerMap.prototype.makeMarkerForStation = function makeMarker (station) {
    var availableBikes = station.availableBikes;
    var availableDocks = station.availableDocks;
    var stationName = station.stationName;
    var latitude = station.latitude;
    var longitude = station.longitude;
    var bikeIcon = L.divIcon({
      className: 'icon-wrapper',
      html: '<span class="map-icon map-icon-bicycle-store"><span>'
    });

    if (availableBikes !== 0 && availableDocks !== 0) return null;

    var marker =  L.marker([latitude, longitude], { icon: bikeIcon }).addTo(this.map);

    if (availableBikes === 0) {
      marker.bindPopup('Zero bikes at ' + stationName + '!');
    } else if (availableDocks === 0) {
      marker.bindPopup('Zero docks at ' + stationName + '!');
    };
  };

  root.VolunteerMap = VolunteerMap;

})(window)
