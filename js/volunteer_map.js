(function(root) {

  var Marker = window.Marker;

  var VolunteerMap = function initializeVolunteerMap (data, map) {
    this.map = map;
    this.stationList = data.stationBeanList;
    this.stationLookup = this.stationLookup || this.buildStationLookup();
  };

  VolunteerMap.prototype.buildStationLookup = function () {
    var lookup = {};

    this.stationList.map(function(station) {
      lookup[station['id']] = station;
    });

    return lookup;
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

    if (availableBikes !== 0 && availableDocks !== 0) return null;

    (new Marker(station, this.map)).draw();
    (new SurroundingStations(station, this.stationLookup, this.map)).draw();
  };

  root.VolunteerMap = VolunteerMap;

})(window)
