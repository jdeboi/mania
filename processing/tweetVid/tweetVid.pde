float displayScale = 0.5;

PImage iphone;
PImage tweetBar;
PImage profilePic;
PFont font;
PFont boldFont;
ArrayList<Tweet>tweets;
boolean newTweet = false;
float zoomIn = 0;


import ddf.minim.*;
Minim minim;
AudioPlayer tweetSound;

void setup() {
  //size(803, 1602);
  size(401, 801);
  //println(803/1.5);
  //println(1602/1.5);
  //font = createFont("Helvetica.ttf", tSize, true);
  PFont.list();
  font = createFont("Helvetica Neue", tSize, true);
  boldFont = createFont("Helvetica Neue Bold", tSize, true);

  tweets = new ArrayList<Tweet>();
  tweets.add(new Tweet("hello world hello world hello world hello world hello world hello world hello world", "images/0.png"));
  tweets.add(new Tweet("asdfasdfasdf asd", "images/0.png"));
  iphone = loadImage("iphone.png");
  tweetBar = loadImage("tweetBar.png");
  profilePic = loadImage("profilePic.png");
  mask = createGraphics(535, 296);



  mask.beginDraw();
  mask.background(0);
  mask.stroke(190);
  mask.fill(255);
  mask.rect(0, 0, mask.width, mask.height, 25);
  mask.endDraw();

  minim = new Minim(this);
  tweetSound = minim.loadFile("tweetSound.mp3", 2048);
}

void mousePressed() {
  addTweet("as asdlkas asdfjksdfljk ad;lkasd sda asdf;lkasdk ads ads", "images/0.png");
}


void draw() {
  background(255);
  scale(displayScale);



  drawTweets();
  image(iphone, 0, 0);
  displayTime();
  displayTweetNum();
}

void addTweet(String text, String path) {
  tweets.add(new Tweet(text, path));
  newTweet = true;
  tweetSound.play();
}

void displayTime() {
  textFont(boldFont, 28);
  fill(255);
  stroke(255);
  pushMatrix();
  translate(88, 100);
  int hour = hour();
  hour %= 12;
  if (hour == 0) hour = 12;
  int min = minute();
  String m = "" + min;
  if (min < 10) m = "0" + min;
  text(hour + ":" + m, 0, 0);
  popMatrix();
}

void displayTweetNum() {
  textFont(boldFont, 19);
  fill(255);
  stroke(255);
  pushMatrix();
  int num = tweets.size();
  float tw = textWidth(num + "");
  translate(380-tw, 184);
  text(num, 0, 0);
  popMatrix();
}

void drawTweets() {
  pushMatrix();
  translate(70, 320);
  if (newTweet) {
    translate(0, -500 + zoomIn);
    zoomIn+=20;
    if (zoomIn >= 500) {
      newTweet = false;
      zoomIn = 0;
    }
  }
  for (int i = tweets.size() -1; i >= 0; i--) {
    tweets.get(i).display();
    translate(0, 500);
  }
  popMatrix();
}
