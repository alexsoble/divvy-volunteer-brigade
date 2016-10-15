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
      self.drawLinesForStation(station, 'zero bikes');
    } else if (availableDocks === 0) {
      marker.bindPopup('Zero docks at ' + stationName + '!');
      self.drawLinesForStation(station, 'zero docks');
    };
  };


  VolunteerMap.prototype.drawLinesForStation = function drawLines (station, bikesOrDocks) {
    var self = this;
    var nearest = nearestStationsLookup[station.id];

    var stationCoordinates = new L.LatLng(station.latitude, station.longitude);

    for (i = 0; i < nearest.length; i++) {
      var nearbyStation = nearest[i];
      var nearbyCoordinates = new L.LatLng(nearbyStation.latitude, nearbyStation.longitude);

      var pointList = [stationCoordinates, nearbyCoordinates];

      var lineConfig = {
        weight: 6,
        opacity: 0.75,
        smoothFactor: 1,
      };

      if (bikesOrDocks === 'zero bikes') {
        lineConfig.color = 'red';
      } else if (bikesOrDocks === 'zero docks') {
        lineConfig.color = 'orange';
      };

      var dy = nearbyStation.latitude - station.latitude;
      var dx = nearbyStation.longitude - station.longitude;

      var sinDisplacement = Math.sin(Math.atan2(dy, dx));
      var cosDisplacement = Math.cos(Math.atan2(dy, dx));


      if (bikesOrDocks === 'zero docks') {

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

      } else if (bikesOrDocks === 'zero bikes') {

        var leftArrowHeadLatLong = [
          [station.latitude, station.longitude],
          [
            station.latitude + (-sinDisplacement + cosDisplacement) * 0.0004,
            station.longitude + (-cosDisplacement - sinDisplacement) * 0.0004
          ]
        ];

        var rightArrowHeadLatLong = [
          [station.latitude, station.longitude],
          [
            station.latitude + (-sinDisplacement - cosDisplacement) * 0.0004,
            station.longitude + (-cosDisplacement + sinDisplacement) * 0.0004
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

  root.VolunteerMap = VolunteerMap;

})(window)
