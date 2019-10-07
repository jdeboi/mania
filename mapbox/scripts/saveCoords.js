
// separate the adding of the coordinates
// from the displaying of the coordinates
// from getting streetview images

let walker;

function setup() {
  createCanvas(200, 200);
  walker = new Walker(home);

}

function draw() {

}




myMap.on('load', function() {

  addLine("route", "#f30");
  addLine("steps", "#0000ff");
  addLine("intersect", "#00ff00");

  for (let i = 0; i < 24; i++) {
    walker.takeStep();
  }

  walker.eraseStepsLoop();
  walker.setDirections();

  // setMapToLoc(walker.getLastCoordinate());
});

myMap.on('click', function(e) {
  // walker.getCoordinatesJson();
  walker.saveCoordinatesJson();
});
