let photoIndex = 3;
let saveIndex = 0;
let img, depthimg, deepimg;
let needSave = false;
let saveTime = 0;

function preload() {
  img = loadStreetImage(photoIndex);
  // img = loadDeepImage(photoIndex);
  depthimg = loadDepthImage(photoIndex);
  deepimg = loadDeepImage(photoIndex);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  depthimg.resize(img.width, img.height);
  deepimg.resize(img.width, img.height);
}

function draw() {
  image(img, 0, 0);
  tint(255, 100);
  image(depthimg, 0, 0);
  tint(255, 27);
  image(deepimg, 0, 0);

  if (needSave && millis() - saveTime > 1000) {
    tweet();
    needSave = false;
  }
}

function keyPressed() {
  if (key == 's') {
    let num = zeroFill(saveIndex, 9);
    save(num + '.jpg');
    needSave = true;
    saveTime = millis();
    saveIndex++;
  }
}

function tweet() {
  let path = "http://localhost:3000/tweet";
  data = {id: saveIndex, text: "this is a tweet"};
  httpPost(path, "json", data,
  function(result) {
    console.log("success", result);
  }, function(error) {
    console.log(error);
  })
}

////////////////////////////////////////////////////
// LOADING
function loadStreetImage(photoIndex) {
  let num = zeroFill(photoIndex, 5);
  return loadImage(`../streetview2/photo${num}.jpg`);
}

function loadDeepImage(photoIndex) {
  let num = zeroFill(photoIndex, 9);
  return loadImage(`../streetview2/deeplab/${num}.png`);
}

function loadDepthImage(photoIndex) {
  let num = zeroFill(photoIndex, 9);
  return loadImage(`../streetview2/densedepth/${num}.png`);
}

function zeroFill( number, width ) {
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}
