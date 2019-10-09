float displayScale = 0.6;

PImage iphone;

PFont font;
PFont boldFont;


import ddf.minim.*;
Minim minim;


void setup() {
  //size(803, 1602);
  //size(1204, 801);   // .5
  size(1446, 961);     // .6


  font = createFont("HelveticaNeue", 50, true);
  boldFont = createFont("HelveticaNeue-Bold", 50, true);


  iphone = loadImage("images/iphone.png");
  resizeImage(iphone);

  minim = new Minim(this);

  initEmail();
  initTweet();
  initText();
  
  println( PFont.list());
}

void keyPressed() {
  currentEmail.strIndex++;
}

void mousePressed() {
  addTweet("as asdlkas asdfjksdfljk ad;lkasd sda asdf;lkasdk ads ads", "images/tweet/processed/0.png");
}


void draw() {
  background(255);

  pushMatrix();
  //scale(displayScale);

  displayEmail();

  translate(iphone.width, 0);
  displayTweet();

  translate(iphone.width, 0);
  //displayText();
  displayFriendText();

  popMatrix();

  fill(255);
  noStroke();
  rect(0, 0, 60, 20);
  fill(0);
  textSize(10);
  text(frameRate, 10, 10);
}

void sendEmail() {
  emailSound.play();
}

void displayCursor(float x, float y) {
  pushMatrix();
  translate(x, y);
  if (millis()%1000 > 500) {
    stroke(0, 0, 255);
  } else {
    stroke(255);
  }
  strokeWeight(2);
  line(0, -tSize*displayScale, 0, 10*displayScale);
  popMatrix();
}

void displayTime() {
  displayTime(255);
}

void displayTime(color c) {
  textFont(boldFont, 25*displayScale);
  fill(c);
  stroke(c);
  pushMatrix();
  translate(88*displayScale, 97*displayScale);
  int hour = hour();
  hour %= 12;
  if (hour == 0) hour = 12;
  int min = minute();
  String m = "" + min;
  if (min < 10) m = "0" + min;
  text(hour + ":" + m, 0, 0);
  popMatrix();
}


void resizeImage(PImage pic) {
  pic.resize(int(pic.width*displayScale), int(pic.height*displayScale));
}
