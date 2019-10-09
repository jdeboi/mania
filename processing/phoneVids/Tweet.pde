
PImage tweetScreen;
PImage tweetBar;
PImage profilePic;
ArrayList<Tweet>tweets;
boolean newTweet = false;
float zoomIn = 0;
AudioPlayer tweetSound;

float spacing = 10;
PGraphics mask;
int tSize = 25;
int lineSpacing = 5;
int numTweets = 0;

void displayTweet() {
  drawTweets();
  image(tweetScreen, 0, 0);
  displayTime();
  displayTweetNum();
  image(iphone, 0, 0);
}

void displayTweetNum() {
  textFont(boldFont, 19*displayScale);
  fill(255);
  stroke(255);
  pushMatrix();
  float tw = textWidth(numTweets + "");
  translate(380*displayScale-tw, 182*displayScale);
  text(numTweets, 0, 0);
  popMatrix();
}

void drawTweets() {
  pushMatrix();
  translate(70*displayScale, 320*displayScale);
  if (newTweet) {
    translate(0, (-500 + zoomIn)*displayScale);
    zoomIn+=20;
    if (zoomIn >= 500) {
      newTweet = false;
      zoomIn = 0;
    }
  }
  for (int i = tweets.size() -1; i >= 0; i--) {
    tweets.get(i).display();
    translate(0, tweets.get(i).h);
  }
  popMatrix();
}

void addTweet(String text, String path) {
  tweets.add(new Tweet(text, path));
  if (tweets.size() > 4) {
    tweets.remove(0);
  }
  newTweet = true;
  tweetSound.cue(0);
  tweetSound.play();
}


void initTweet() {

  tweetScreen = loadImage("images/tweet/tweetsJust.png");
  resizeImage(tweetScreen);
  tweetBar = loadImage("images/tweet/tweetBar.png");
  resizeImage(tweetBar);
  profilePic = loadImage("images/tweet/profilePic.png");
  resizeImage(profilePic);

  mask = createGraphics(int(535*displayScale), int(296*displayScale));
  mask.beginDraw();
  mask.background(0);
  mask.stroke(190);
  mask.fill(255);
  mask.rect(0, 0, mask.width, mask.height, 25);
  mask.endDraw();

  tweetSound = minim.loadFile("sounds/tweetSound.mp3", 2048);

  tweets = new ArrayList<Tweet>();
  tweets.add(new Tweet("hello world hello world hello world hello world hello world hello world hello world", "images/tweet/processed/0.png"));
  tweets.add(new Tweet("asdfasdfasdf asd", "images/tweet/processed/0.png"));
}

class Tweet {

  String text;
  PGraphics canvas;
  PImage img;
  long time;

  float h;

  Tweet(String text, String imgPath) {
    this.text = text;
    img = loadImage(imgPath);
    time = millis();
    canvas = createGraphics (mask.width, mask.height);
    numTweets++;
  }

  void display() {
    h=0;
    
    textFont(font, tSize*displayScale);

    pushMatrix();

    // profile pic
    translate(0, 0);
    image(profilePic, 0, 0);


    translate(profilePic.width + 20*displayScale, 20*displayScale);
    h += 20*displayScale;

    // name
    fill(0);
    text("Jenna deBoisblanc", 0, 0);
    fill(50);
    text("@jdeboisblanc " + getTimePassed(), textWidth("Jenna deBoisblanc "), 0);

    // text
    fill(0);
    translate(0, (tSize+10)*displayScale);
    h += (tSize+10)*displayScale;

    displayWrapped(text, int(tSize*displayScale), canvas.width);

    // image
    int texth = getTextBoxHeight(text, int(tSize*displayScale), canvas.width);
    translate(0, texth);
    h += texth;
    canvas.beginDraw();
    canvas.clear();
    canvas.image(img, 0, 0);
    canvas.mask(mask);
    canvas.endDraw();
    image(canvas, 0, 0);

    // tweetbar
    translate(0, canvas.height +20*displayScale);
    h += canvas.height +20*displayScale;
    image(tweetBar, 0, 0);

    // line
    translate(0, tweetBar.height + 20*displayScale);
    h += tweetBar.height + 20*displayScale;
    stroke(200);
    line(-100*displayScale, 0, 500*displayScale, 0);
    popMatrix();
    
    h+= 20*displayScale;
  }

  //float getTextHeight() {

  //  float len = (text.length()*tSize / canvas.width + 1) * tSize+5;
  //  println(text.length()+ " " + len);
  //  return len;
  //}

  String getTimePassed() {
    if ((millis() - time)/1000 < 60) {
      long sec = (millis() - time)/1000;
      return sec + "s";
    } else if ((millis() - time)/1000/60 < 60) {
      long min = (millis() - time)/1000/60;
      return min + "m";
    } else if ((millis() - time)/1000/60/60 < 24) {
      long hours = (millis() - time)/1000/60/60;
      return hours + "h";
    } else {
      long days = (millis() - time)/1000/60/60/24;
      return days + "d";
    }
  }
}
