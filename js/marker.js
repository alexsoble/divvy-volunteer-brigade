(function(root) {

  var Marker = function initializeMarker (station, map) {
    this.station = station;
    this.map = map;
    this.noBikes = (this.station.availableBikes === 0);
    this.noDocks = (this.station.availableDocks === 0)
  };

  Marker.prototype.draw = function () {
    marker = L.circleMarker([this.station.latitude, this.station.longitude], this.circleMarkerOptions() )
              .addTo(this.map);

    marker.bindPopup(this.popupText());
  };

  Marker.prototype.bikeIcon = function () {
    return L.divIcon({
      className: this.bikeIconClassName(),
      html: this.bikeIconHtml()
    });
  };

  Marker.prototype.circleMarkerOptions = function () {
    if (this.noBikes || this.noDocks) {
      return {
        color: 'red',
        fillColor: 'red',
        radius: 16
      };
    } else {
      return {
        color: 'blue',
        fillColor: 'blue',
        radius: 8
      };
    };
  };

  Marker.prototype.popupText = function () {
    if (this.noBikes) {
      return 'Zero bikes at ' + this.station.stationName + '!';
    } else if (this.noDocks) {
      return 'Zero docks at ' + this.station.stationName + '!';
    } else {
      return (String(this.station.availableBikes) + ' bikes and ' +
        String(this.station.availableDocks) + ' available docks at ' +
        this.station.stationName + '.');
    };
  };

  root.Marker = Marker;

})(window)
