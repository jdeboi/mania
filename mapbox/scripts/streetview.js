/*
If there are 100 coordinates in a day
I could run this program 285 times per month
or 9.5 times per day
for free

Because for each billing account, for qualifying Google Maps Platform SKUs,
a $200 USD Google Maps Platform credit is available each month, and
automatically applied to the qualifying SKUs.

Price per STATIC PANORAMA SKU
0.007 USD per each
(7.00 USD per 1000)
So if there are 100 coordinates, that's approx $1 to run

Dynamic panorama SKU
0.014 USD per each
(14.00 USD per 1000)

*/

let STREET_VIEW_ON = true;
let imgs = [];
let imgIDs = [];
let photoID = 0;

let steps;
let keys;
let saveIndex = 0;

let todayIndex = 0;
let saved = false;
let lastChecked = 0;

function preload() {
  keys = loadJSON('../json/keys.json');
  steps = loadJSON('../json/steps.json');
}

function setup() {
  createCanvas(456, 456);
  loadImages(steps[todayIndex].coordinates);
}

function draw() {
  // console.log(imgIDs.length, steps[todayIndex].coordinates.length);
  if (!saved && imgIDs.length == steps[todayIndex].coordinates.length) {
    saveImages();
  }

}

function loadImages(coords) {
  if (STREET_VIEW_ON) {
    for (let i = 0; i < coords.length; i++) {
      imgs[i] = loadImage(getStreetViewURL(coords[i]), function() {
        success(i);
      },
      function() {
        fail(i);
      });
    }
  }
}

function saveImages() {
  // for (let i = 0; i < imgIDs.length; i++) {
  if (saveIndex < imgIDs.length) {
    if (millis() - lastChecked > 500) {
      console.log("saving", imgIDs[saveIndex]);
      lastChecked = millis();
      let num = zeroFill(imgIDs[saveIndex], 5);
      if (imgs[saveIndex] != null) imgs[saveIndex].save('photo' + num, 'jpg');
      else console.log(imgs[saveIndex], saveIndex, "not viable?");
      saveIndex++;
    }
  }
  else {
    saved = true;
    console.log("saved");
  }


  // }
}

function success(i) {
  // console.log("success", i);
  imgIDs.push(i);
}

function fail(i) {
  console.log("failed", i);
}

function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}

/*
heading indicates the compass heading of the camera. Accepted values are from 0
to 360 (both values indicating North, with 90 indicating East, and 180 South).
If no heading is specified, a value will be calculated that directs the camera
towards the specified location, from the point at which the closest photograph
was taken.

fov (default is 90) determines the horizontal field of view of the image.
The field of view is expressed in degrees, with a maximum allowed value of 120.
When dealing with a fixed-size viewport, as with a Street View image of a set
size, field of view in essence represents zoom, with smaller numbers indicating
a higher level of zoom.

pitch (default is 0) specifies the up or down angle of the camera relative to
the Street View vehicle. This is often, but not always, flat horizontal.
Positive values angle the camera up (with 90 degrees indicating straight up);
negative values angle the camera down (with -90 indicating straight down).

radius (default is 50) sets a radius, specified in meters, in which to search
for a panorama, centered on the given latitude and longitude. Valid values are
non-negative integers.

Street View images can be returned in any size up to 640 x 640 pixels.
Unless you are a premium member,  2048 x 2048 pixels
*/
function getStreetViewURL(loc) {
  let w = 456;
  let h = 456;
  let heading = random(0, 360);
  let fov = random(40, 120);
  let pitch = random(-45, 45);
  let url = "https://maps.googleapis.com/maps/api/streetview?";
  url += "location=" + loc[1] + "," + loc[0];
  url += "&size=" + w + "x" + h;
  url += "&heading=" + heading;
  url += "&fov=" + fov;
  url += "&pitch=" + pitch;
  url += "&key=" + keys.google;
  return url;
}
