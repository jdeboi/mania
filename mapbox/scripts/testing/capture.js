var capture;
var recording = false;
var c;
var gif;


function setup() {
  createCanvas(400, 400);
  // Create a capturer that exports an animated GIF
  // Notices you have to specify the path to the gif.worker.js
  capturer = new CCapture( {
    format: 'gif',
    workersPath: '../libs/',
    framerate: 60,
    verbose: true,
    width: width,
    height: height
  });
  // capturer.start();
}

function draw() {
  background(255);
  stroke(0);
  strokeWeight(10);
  rect(100, height/2, 50, 50);

  if (recording) capturer.capture( canvas );

}

function mousePressed() {
  recording = !recording;
  if (!recording) {
    console.log("stopping");
    capturer.stop();
    // default save, will download automatically a file called {name}.extension (webm/gif/tar)
    capturer.save();
    // // custom save, will get a blob in the callback
    // capturer.save( function( blob ) { /* ... */ } );
  }
  else {
    console.log("starting");
  }
}

function setupGif() {
  gif = new GIF({
    workers: 2,
    quality: 40,
    width: width,
    height: height
  });

  gif.on('finished', function(blob) {
    // window.open(URL.createObjectURL(blob));
    console.log(URL.createObjectURL(blob));
    setupGif();
  });
}
