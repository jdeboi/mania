PImage img;

void setup() {
  size(600, 600);
  
  img = loadImage("https://maps.googleapis.com/maps/api/streetview?location=41.403609,2.174448&size=456x456&key=AIzaSyCP5DZVt0EKvzRHFlH0eR0P4HQNXn3Z-4o");
  //img.save("1.jpg");
}

void draw() {
  image(img, 0, 0);
}
