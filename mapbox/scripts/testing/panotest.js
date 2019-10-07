
// let STREET_VIEW_ON = true;
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

let home = [-90.105797,29.9307079];
let step0 = [-90.105797,29.9307079];
let step1 = [-90.106026,29.93069];
let step2 = [-90.105965,29.930168];

let imgs = [];
let imagesDone = false;
let photoIndex = 0;

let saveIndex = 0;
let saved = false;
let lastChecked = 0;

function preload() {
}

function setup() {
  createCanvas(456, 456);

  // loadPathImages(step1, step2)
  // .then(function(allimgs) {
  //   console.log("all promises done");
  //   imagesDone = true;
  //   for (img of allimgs) {
  //     imgs.push(img);
  //   }
  //   const promises = []
  //
  //   for (let i = 0; i < imgs.length; i++) {
  //     promises.push(saveLater(i));
  //   }
  //   return Promise.all(promises)
  // })
  // .then(function() {
  //   console.log("all images saved?")
  // })
  // .catch(function (error) {
  //   console.log('Something went wrong', error);
  // });

  loadPanoImages(home, 1)
  .then(function(allimgs) {
    console.log("all promises done");
    imagesDone = true;
    for (img of allimgs) {
      imgs.push(img);
    }
    return saveAllImgsPromise();
  })
  .then(function() {
    console.log("all images saved?")
  })
  .catch(function (error) {
    console.log('Something went wrong', error);
  });
}

function draw() {
  // console.log(imgIDs.length, steps[todayIndex].coordinates.length);
  if (imagesDone) {
    image(imgs[photoIndex], 0, 0);
    // incrementPhotoIndex(50);

    // saveImages()
  }

}

function mousePressed() {
  incrementPhotoIndex(0);
}

function incrementPhotoIndex(rate) {
  if (millis() - lastChecked > rate) {
    lastChecked = millis();
    photoIndex++;
    if (photoIndex >= imgs.length) {
      photoIndex = 0;
    }
  }
}

function loadPathImages(coord0, coord1) {
  const promises = []

  let v0 = createVector(coord0[0], coord0[1]);
  let v1 = createVector(coord1[0], coord1[1]);
  for (let i = 0; i <= 1; i+= .2) {
    let v = p5.Vector.lerp(v0, v1, i);
    let coord = [v.x, v.y];
    console.log(v);
    let path = getStreetViewURL(coord);
    promises.push(loadImagePromise(path));
  }

  console.log(promises) // [ Promise { "pending" }, Promise { "pending" }, Promise { "pending" } ]

  // We are passing an array of pending promises to Promise.all
  // Promise.all will wait till all the promises get resolves and then the same gets resolved.
  return Promise.all(promises)
}


function loadPanoImages(coord, inc) {
  const promises = []

  for (let i = 0; i < 20; i+= inc) {
    let path = getStreetViewURL(coord, i, true);
    promises.push(loadImagePromise(path));
  }

  // console.log(promises) // [ Promise { "pending" }, Promise { "pending" }, Promise { "pending" } ]

  // We are passing an array of pending promises to Promise.all
  // Promise.all will wait till all the promises get resolves and then the same gets resolved.
  return Promise.all(promises)
}

function loadImagePromise(path) {
  return new Promise(function(resolve, reject) {
    loadImage(path, (img) => resolve(img), (error) => reject(error));
  })
}

/*
function saveImages() {
// for (let i = 0; i < imgIDs.length; i++) {
if (saveIndex < imgs.length) {
if (millis() - lastChecked > 500) {
console.log("saving", saveIndex); //imgIDs[saveIndex]);
lastChecked = millis();
let num = zeroFill(saveIndex, 5); //zeroFill(imgIDs[saveIndex], 5);
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
*/

function saveImage(saveIndex) {
  let num = zeroFill(saveIndex, 5); //zeroFill(imgIDs[saveIndex], 5);
  if (imgs[saveIndex] != null) imgs[saveIndex].save('photo' + num, 'jpg');
  else console.log(imgs[saveIndex], saveIndex, "not viable?");
  console.log("saved " + saveIndex);
}


function zeroFill( number, width ){
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
function getStreetViewURL(loc, heading=0, useHeading=false) {
  let w = 300;
  let h = 300;
  let fov = 90;
  let pitch = 0;
  let url = "https://maps.googleapis.com/maps/api/streetview?";
  url += "location=" + loc[1] + "," + loc[0];
  url += "&size=" + w + "x" + h;
  url += "&heading=" + heading;
  url += "&fov=" + fov;
  url += "&pitch=" + pitch;
  url += "&key=" + keys.google;
  return url;
}

function saveLater(index) {
  return new Promise(resolve => setTimeout(resolve, index*1000))
  .then(saveImage(index));
}

// function saveLater(index) {
//   return new Promise(function(resolve, reject) {
//     var timer = setTimeout(function(){
//         resolve(index*1000));
//     }, ms);
//   })
// }

function saveAllImgsPromise() {
  console.log("saving em all")
  const promises = []
  for (let i = 0; i < imgs.length; i++) {
    promises.push(saveLater(i));
  }
  return Promise.all(promises)
}
