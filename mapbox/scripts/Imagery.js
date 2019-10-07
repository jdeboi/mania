let TWEETING = false;
let photoIndex;
// let saveIndex = photoIndex;
// let img, depthimg, deepimg;
// let needSave = false;
let savingDone = false;
let saveTime = 0;

let imgs = [];
let depthimgs = [];
let deepimgs = [];

let startIndex, endIndex;

let deets;
let adjs = [];
let nouns = [];
let adjIndex = 0;
let nounIndex = 0;
let genre = "manic";

function preload() {
  loadAllImages(0, 10);
  deets = loadJSON("../streetview2/deepcap.json");

}

function setup() {
  createCanvas(imgs[0].width, imgs[0].height);
  resizeAllImages();
}

function draw() {

  drawImage(photoIndex);
  // displayAllDeets(photoIndex);

  fill(255, 0, 0);
  stroke(255, 0, 0);
  text(photoIndex, 0, 10);
  // saveAllImages();
}

function saveAllImages() {
  if (!savingDone) {
    if (millis() - saveTime > 1000) {
      saveImage(photoIndex);
      saveTime = millis();
      photoIndex++;
      if (photoIndex > endIndex) {
        savingDone = true;
        photoIndex = startIndex;
      }
    }
  }
}

// refers to the number in the path name
function drawImage(id) {
  let theseDeets = getDeets(id);
  let sign = getSignIndex(id, .87);
  // if (sign > -1) {
  //   tint(255, 255);
  //   background(255);
  //   drawSign(theseDeets[sign], id);
  // }
  // else {
    image(imgs[getArrayIndex(id)], 0, 0);
    tint(255, 100);
    // image(depthimgs[getArrayIndex(id)], 0, 0);
    // tint(255, 27);
    image(deepimgs[getArrayIndex(id)], 0, 0);
    displayBoundaries(id, 0.3, 1);
  // }
}

function mouseClicked() {
  incrementPhotoIndex();
  genre = random(["divine", "paranoid", "grandiose", "psychotic"]);
  getRandomWords(genre);
}

function keyPressed() {
  if (key == 's') {
    // saveImage(0);
  }
  else if (key == 'n') {
    incrementPhotoIndex();
  }
}

function incrementPhotoIndex() {
  photoIndex++;
  if (photoIndex > endIndex) {
    photoIndex = startIndex;
  }
}

function saveImage(id) {
  let num = zeroFill(id, 9);
  save(num + '.jpg');
  needSave = true;
  saveTime = millis();
  // saveIndex++;
}

// inclusive of beginning and end
function loadAllImages(start, end) {
  startIndex = start;
  endIndex = end;
  photoIndex = startIndex;
  // img = loadStreetImage(photoIndex);
  // depthimg = loadDepthImage(photoIndex);
  // deepimg = loadDeepImage(photoIndex);

  for (let i = start; i <= end; i++) {
    imgs[getArrayIndex(i)] = loadStreetImage(i);
    depthimgs[getArrayIndex(i)] = loadDepthImage(i);
    deepimgs[getArrayIndex(i)] = loadDeepImage(i);
  }
}

function resizeAllImages() {
  let w = imgs[0].width;
  let h = imgs[0].height;

  // depthimg.resize(w, h);
  // deepimg.resize(w, h);
  for (let i = 0; i < imgs.length; i++) {
    depthimgs[i].resize(w, h);
    deepimgs[i].resize(w, h);
  }
}

function getArrayIndex(id) {
  return id - startIndex;
}

function tweet() {
  let path = "http://localhost:3000/tweet";
  data = {id: saveIndex, text: "this is a tweet"};
  httpPost(path, "json", data,
  function(result) {
    console.log(result);
  }, function(error) {
    console.log("error");
  })
}

function getDeets(photoIndex) {
  return deets[photoIndex].results;
}

function getSignIndex(id, accuracy) {
  let index = -1;
  let theseDeets = getDeets(id);
  for (let i = 0; i < theseDeets.length; i++) {
    let deet = theseDeets[i];
    if (isASign(deet) && deetValid(deet, accuracy)) {
    return i;
    }
  }
  return -1;
}

function displayBoundaries(photoIndex, startAcc, endAcc) {
  let d = getDeets(photoIndex);
  for (let deet of d) {
    if (!deetUnknown(deet) && deetValid(deet, startAcc, endAcc)) {
      drawBoundary(deet);
      return;
    }
  }
}

function drawText(deet) {
  let adj = genre;
  if (adjs.length > 0) adj = adjs[adjIndex];
  let str = deet.class;
  let isloc = str.indexOf(" is ");
  if (isloc > 0) {
    str = str.substring(0, isloc + 4, ) + adj;
  }
  fill(255);
  stroke(255);
  text(str, 0, 10);
  fill(255, 0, 255);
  text(nf(parseFloat(deet.score),0, 2), 0, 20);

}

function deetValid(deet, startAcc, endAcc) {
  let score = parseFloat(deet.score);
  return score >= startAcc && score <= endAcc;
}

function drawSign(deet, id) {
  let coords = deet.bbox;
  let x = parseFloat(coords[0]);
  let y = parseFloat(coords[1]);
  let w = parseFloat(coords[2]);
  let h = parseFloat(coords[3]);

  // image(imgs[getArrayIndex(id)], 0, 0);

  // fill(255);
  // noStroke();
  // rect(0, 0, x, height);
  // rect(x, 0, w, y);
  // rect(x+w, 0, width-w-x, height);
  // rect(x, y+h, w, height - y - h);
  imgs[getArrayIndex(id)].loadPixels();
  let img = imgs[getArrayIndex(id)].get(x, y, w, h);
  image(img, 0, 0, 300, 300);
}

function drawBoundary(deet) {
  let coords = deet.bbox;
  let x = parseFloat(coords[0]);
  let y = parseFloat(coords[1]);
  let w = parseFloat(coords[2]); //parseFloat(coords[2]) - parseFloat(coords[0]);
  let h = parseFloat(coords[3]); //parseFloat(coords[3]) - parseFloat(coords[1]);
  push();
  translate(x, y);
  noFill();
  stroke(0, 0, 255);
  rect(0, 0, w, h);

  drawText(deet);
  pop();
}

function deetUnknown(deet) {
  return deet.class == "the photo is <unk>";
}

function isASign(deet) {
  return deet.class.indexOf("sign") > -1;
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


function getRandomWords(word) {
  console.log("word", word);
  adjs = [];
  nouns = [];
  adjIndex = 0;
  nounIndex = 0;
  loadJSONPromise(getRelatedURL(word))
  .then((data) => {
    // console.log(data);
    for (d of data) {
      if (d.score > 60000) {
        if (d.tags[0] == "adj") adjs.push(d.word);
        else if (d.tags[0] == "noun") nouns.push(d.word);
      }
    }
    // console.log(adjs, nouns);
    adjIndex = Math.floor(random(adjs.length));
    nounIndex = Math.floor(random(nouns.length));
  })
  .catch(function (error) {
    console.log('Something went wrong', error);
  });
}
function loadJSONPromise(path) {
  return new Promise(function(resolve, reject) {
    loadJSON(path, (data) => resolve(data), (error) => reject(error));
    // createImg(path, "nope", (img) => resolve(img));
  })
}

function getPartOfSpeech(word) {
  loadJSONPromise(getPartOfSpeechURL(word))
  .next();
}
