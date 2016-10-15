(function(root) {

  var SurroundingStations = function initializeSurroundingStations (station, map) {
    this.station = station;
    this.map = map;
  };

  SurroundingStations.prototype.draw = function drawLines () {
    var nearest = nearestStationsLookup[this.station.id];
    var self = this;

    for (i = 0; i < nearest.length; i++) {
      var nearbyStation = nearest[i];
      (new Marker(nearbyStation, this.map)).draw();
      self.drawNearbyStation(nearbyStation);
    }
  };

  SurroundingStations.prototype.drawNearbyStation = function drawStation (nearbyStation) {
    var nearbyCoordinates = new L.LatLng(nearbyStation.latitude, nearbyStation.longitude);

    var pointList = [this.stationLatLng(), nearbyCoordinates];
    var line = new L.polyline(pointList, this.lineConfig());
    line.addTo(this.map);
    this.drawArrow(nearbyStation);
  };

  SurroundingStations.prototype.drawArrow = function drawArrow (nearbyStation) {
    var dy = nearbyStation.latitude - this.station.latitude;
    var dx = nearbyStation.longitude - this.station.longitude;

    var sinDisplacement = Math.sin(Math.atan2(dy, dx));
    var cosDisplacement = Math.cos(Math.atan2(dy, dx));

    if (this.station.availableDocks === 0) {

      var leftArrowHeadLatLong = [
        [nearbyStation.latitude, nearbyStation.longitude],
        [
          nearbyStation.latitude + (-sinDisplacement + cosDisplacement) * 0.0004,
          nearbyStation.longitude + (-cosDisplacement - sinDisplacement) * 0.0004
        ]
      ];

      var rightArrowHeadLatLong = [
        [nearbyStation.latitude, nearbyStation.longitude],
        [
          nearbyStation.latitude + (-sinDisplacement - cosDisplacement) * 0.0004,
          nearbyStation.longitude + (-cosDisplacement + sinDisplacement) * 0.0004
        ]
      ];

      var leftArrowHead = new L.polyline(leftArrowHeadLatLong, lineConfig);
      var rightArrowHead = new L.polyline(rightArrowHeadLatLong, lineConfig);

      leftArrowHead.addTo(this.map);
      rightArrowHead.addTo(this.map);

    } else if (this.station.availableBikes === 0) {

      var leftArrowHeadLatLong = [
        [this.station.latitude, this.station.longitude],
        [
          this.station.latitude + (-sinDisplacement + cosDisplacement) * 0.0004,
          this.station.longitude + (-cosDisplacement - sinDisplacement) * 0.0004
        ]
      ];

      var rightArrowHeadLatLong = [
        [this.station.latitude, this.station.longitude],
        [
          this.station.latitude + (-sinDisplacement - cosDisplacement) * 0.0004,
          this.station.longitude + (-cosDisplacement + sinDisplacement) * 0.0004
        ]
      ];

      var leftArrowHead = new L.polyline(leftArrowHeadLatLong, this.lineConfig());
      var rightArrowHead = new L.polyline(rightArrowHeadLatLong, this.lineConfig());

      leftArrowHead.addTo(this.map);
      rightArrowHead.addTo(this.map);
    };
  };

  SurroundingStations.prototype.lineConfig = function makeConfig () {
    var lineConfig = {
      weight: 6,
      opacity: 0.75,
      smoothFactor: 1,
    };

    if (this.station.availableBikes === 0) {
      lineConfig.color = 'red';
    } else if (this.station.availableDocks === 0) {
      lineConfig.color = 'orange';
    };

    return lineConfig;
  };

  SurroundingStations.prototype.stationLatLng = function makeLatLong () {
    return (new L.LatLng(this.station.latitude, this.station.longitude));
  };

  root.SurroundingStations = SurroundingStations;

})(window)
