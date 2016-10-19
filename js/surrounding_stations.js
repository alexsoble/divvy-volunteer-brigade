(function(root) {

  var SurroundingStations = function initializeSurroundingStations (station, stationLookup, map) {
    this.station = station;
    this.stationLookup = stationLookup;
    this.map = map;
    this.noDocks = (this.station.availableDocks === 0);
    this.noBikes = (this.station.availableBikes === 0);
  };

  SurroundingStations.prototype.draw = function drawLines () {
    var nearest = nearestStationsLookup[this.station.id];
    var self = this;

    for (i = 0; i < nearest.length; i++) {
      var nearbyStation = this.stationLookup[nearest[i]['id']];

      var valid = (nearbyStation.availableBikes > 0 && this.noBikes) ||
                  (nearbyStation.availableDocks > 0 && this.noDocks);

      if (valid) {
        (new Marker(nearbyStation, this.map)).draw();
        self.drawNearbyStation(nearbyStation);
      };
    }
  };

  SurroundingStations.prototype.drawNearbyStation = function drawStation (nearbyStation) {
    var nearbyCoordinates = new L.LatLng(nearbyStation.latitude, nearbyStation.longitude);

    var pointList = [this.stationLatLng(), nearbyCoordinates];
    var line = new L.polyline(pointList, this.lineConfig());
    line.addTo(this.map);

    var arrowHead = L.polylineDecorator(line).addTo(this.map);

    var arrowOffset = 0;
    var anim = window.setInterval(function() {
      arrowHead.setPatterns([
        {
          offset: arrowOffset+'%', repeat: 0, symbol: L.Symbol.arrowHead(
            {
              pixelSize: 15,
              polygon: false,
              pathOptions: {
                stroke: true
              }
            }
          )
        }
      ])
      if(++arrowOffset > 100)
        arrowOffset = 0;
    }, 100);
  };

  SurroundingStations.prototype.lineConfig = function makeConfig () {
    var lineConfig = {
      weight: 6,
      opacity: 0.75,
      smoothFactor: 1,
    };

    if (this.station.availableBikes === 0) {
      lineConfig.color = 'black';
    } else if (this.station.availableDocks === 0) {
      lineConfig.color = 'black';
    };

    return lineConfig;
  };

  SurroundingStations.prototype.stationLatLng = function makeLatLong () {
    return (new L.LatLng(this.station.latitude, this.station.longitude));
  };

  root.SurroundingStations = SurroundingStations;

})(window)
