(function(root) {

  var Marker = function initializeMarker (station, map) {
    this.station = station;
    this.map = map;
    this.noBikes = (this.station.availableBikes === 0);
    this.noDocks = (this.station.availableDocks === 0)
  };

  Marker.prototype.draw = function () {
    marker = L.marker([this.station.latitude, this.station.longitude], { icon: this.bikeIcon() })
              .addTo(this.map);

    marker.bindPopup(this.popupText());
  };

  Marker.prototype.bikeIcon = function () {
    return L.divIcon({
      className: 'icon-wrapper',
      html: this.bikeIconHtml()
    });
  };

  Marker.prototype.bikeIconHtml = function () {
    if (this.noBikes || this.noDocks) {
      return '<span class="map-icon map-icon-bicycle-store problem-station"><span>';
    } else {
      return '<span class="map-icon map-icon-bicycle-store"><span>';
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
