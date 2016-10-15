(function(root) {

  var Marker = function initializeMarker (station, map) {
    this.station = station;
    this.map = map;
  };

  Marker.prototype.draw = function () {
    marker = L.marker([this.station.latitude, this.station.longitude], { icon: this.bikeIcon() })
              .addTo(this.map);

    marker.bindPopup(this.popupText());
  };

  Marker.prototype.bikeIcon = function () {
    return L.divIcon({
      className: 'icon-wrapper',
      html: '<span class="map-icon map-icon-bicycle-store"><span>'
    });
  };

  Marker.prototype.popupText = function () {
    if (this.station.availableBikes === 0) {
      return 'Zero bikes at ' + this.station.stationName + '!';
    } else if (this.station.availableDocks === 0) {
      return 'Zero docs  at ' + this.station.stationName + '!';
    };
  };

  root.Marker = Marker;

})(window)
