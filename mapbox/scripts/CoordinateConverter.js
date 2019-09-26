//https://gps-coordinates.org/distance-between-coordinates.php
function distanceInMetersBetweenCoordinates(longlat0, longlat1) {
  let lat1 = longlat0[1];
  let lon1 = longlat0[0];
  let lat2 = longlat1[1];
  let lon2 = longlat1[0];
  var p = 0.017453292519943295;    // Math.PI / 180
  var a = 0.5 - Math.cos((lat2 - lat1) * p)/2 +
  Math.cos(lat1 * p) * Math.cos(lat2 * p) *
  (1 - Math.cos((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a))*1000; // 2 * R; R = 6371 km
}

// https://stackoverflow.com/questions/639695/how-to-convert-latitude-or-longitude-to-meters
// https://en.wikipedia.org/wiki/Haversine_formula
function metersBetweenCoordinates(longlat0, longlat1){  // generally used geo measurement function
  var R = 6378.137; // Radius of earth in KM
  var dLat = longlat1[1] * Math.PI / 180 - longlat0[1] * Math.PI / 180;
  var dLon = longlat1[0] * Math.PI / 180 - longlat0[0] * Math.PI / 180;
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(longlat0[1] * Math.PI / 180) * Math.cos(longlat1[1] * Math.PI / 180) *
  Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d * 1000; // meters
}

//https://stackoverflow.com/questions/7477003/calculating-new-longitude-latitude-from-old-n-meters
function metersPerDegree(lat) {
  let r_earth = 6378; // km
  return (2*Math.PI/360) * r_earth * Math.cos(lat) * 1000;
}

// returns the degrees of lat and long per meter
function degreesPerMeter(lat) {
  let r_earth = 6378; // km
  let newCoord = [];
  newCoord[0]  = (1 / r_earth) * (180 / Math.PI);
  newCoord[1] =  (1 / r_earth) * (180 / Math.PI) / Math.cos(lat * Math.PI/180);
  return newCoord;
}

function lerpCoords(longlat0, longlat1, per) {
  let newCoord = [];
  if (per > 1) per = 1;
  var dLat = (longlat1[1] - longlat0[1]) * per;
  var dLon = (longlat1[0] - longlat0[0]) * per;
  newCoord[0] = longlat0[0] + dLon;
  newCoord[1] = longlat0[1] + dLat;
  return newCoord;
}

// returns the new coordinate after traveling XY meters
function getNewCoord(longlat, metersX, metersY) {
  let r_earth = 6378; // km
  let newCoord = [];
  newCoord[0] = longlat[0] + (metersY/1000 / r_earth) * (180 / Math.PI) / Math.cos(longlat[1] * Math.PI/180);
  newCoord[1] = longlat[1] + (metersX/1000 / r_earth) * (180 / Math.PI);
  return newCoord;
}

function deg2rad(degrees)
{
  return degrees * (Math.PI/180);
}
