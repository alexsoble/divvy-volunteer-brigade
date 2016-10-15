(function(root) {

  var SurroundingStations = function initializeSurroundingStations (station, map) {
    this.station = station;
    this.map = map;
  };

  SurroundingStations.prototype.draw = function drawLines (station, map) {
    var nearest = nearestStationsLookup[this.station.id];

    var stationCoordinates = new L.LatLng(this.station.latitude, this.station.longitude);

    for (i = 0; i < nearest.length; i++) {
      var nearbyStation = nearest[i];
      var nearbyCoordinates = new L.LatLng(nearbyStation.latitude, nearbyStation.longitude);

      var pointList = [stationCoordinates, nearbyCoordinates];

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

        var line = new L.polyline(pointList, lineConfig);
        line.addTo(this.map);

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

        var leftArrowHead = new L.polyline(leftArrowHeadLatLong, lineConfig);
        var rightArrowHead = new L.polyline(rightArrowHeadLatLong, lineConfig);

        leftArrowHead.addTo(this.map);
        rightArrowHead.addTo(this.map);

        var line = new L.polyline(pointList, lineConfig);
        line.addTo(this.map);
      };
    }
  };

  root.SurroundingStations = SurroundingStations;

})(window)