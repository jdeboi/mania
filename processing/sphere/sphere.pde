// creating custom pano viewers of manipulated space?
// https://developers.google.com/maps/documentation/javascript/streetview
// https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/streetview-custom-simple

import peasy.PeasyCam;
PeasyCam cam;

PImage img;
int diam = 600;

void settings() {
  size(1000, 800, P3D);
}

void setup() {

  cam = new PeasyCam(this, 400);

  background(0);
  noStroke();
  img=loadImage("jena.jpg");
  initializeSphere(30, 30);
}


void draw() {
  background(0);

  textureSphere(diam, diam, diam, img);
}
