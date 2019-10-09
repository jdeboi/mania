PImage textScreen, allTextScreen;
AudioPlayer textSound;

void initText() {
  textScreen = loadImage("images/text/textSingle.png");
  resizeImage(textScreen);
  
  allTextScreen = loadImage("images/text/textAll.png");
  resizeImage(allTextScreen);
  
  textSound = minim.loadFile("sounds/textSound.mp3", 2048);
}

void displayText() {
  image(textScreen, 0, 0);
  displayTime(0);
  image(iphone, 0, 0);
}

void displayFriendText() {
  image(allTextScreen, 0, 0);
  displayInitials();
  displayNumTexts();
  displayTime(0);
  image(iphone, 0, 0);
}

void displayInitials() {
  fill(255);
  pushMatrix();
  translate(400*displayScale, 200*displayScale);
  textFont(font, 30*displayScale);
  text("BM", 0, 0);
  popMatrix();
}

void displayNumTexts() {
  fill(255);
  pushMatrix();
  translate(100*displayScale, 160*displayScale);
  textFont(font, 30*displayScale);
  text(30, 0, 0);
  popMatrix();
}
