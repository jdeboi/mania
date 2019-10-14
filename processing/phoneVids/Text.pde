PImage textScreen, allTextScreen;
AudioPlayer textSound;
ArrayList<Text> texts;

void initText() {
  textScreen = loadImage("images/text/textSingle.png");
  resizeImage(textScreen);

  allTextScreen = loadImage("images/text/textAll.png");
  resizeImage(allTextScreen);

  textSound = minim.loadFile("sounds/textSound.mp3", 2048);
  
  texts = new ArrayList<Text>();
  texts.add(new Text("Jenny0", "halalaskd asd", millis()));
  texts.add(new Text("Jenny1", "halalaskd asd", millis()));
  texts.add(new Text("Jenny2", "halalaskd asd", millis()));
  texts.add(new Text("Jenny3", "halalaskd asd", millis()));
  texts.add(new Text("Jenny4", "halalaskd asd", millis()));
  texts.add(new Text("Jenny5", "halalaskd asd", millis()));
  texts.add(new Text("Jenny6", "halalaskd asd", millis()));
  texts.add(new Text("Jenny7", "halalaskd asd", millis()));
  texts.add(new Text("Jenny8", "halalaskd asd", millis()));
  texts.add(new Text("Jenny9", "halalaskd asd", millis()));
  
}

void displayText() {
  image(textScreen, 0, 0);

  displayTime(0);
  image(iphone, 0, 0);
}

void displayFriendText() {
  image(allTextScreen, 0, 0);
  displayInitials();
    displayReceivedTexts();
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


void displayReceivedTexts() {
  pushMatrix();
  translate(115*displayScale, 385*displayScale);
  for (Message e : texts) {

    pushMatrix();

    // bubble initials
    fill(e.bubbleColor);
    noStroke();
    float diam = 70 * displayScale;
    ellipse(0, 0, diam, diam);
    fill(220);
    text(e.initials, 0, 0);

    // name
    int titleSize = 26;
    int titleSpacing = 34;
    translate(diam/2+30*displayScale, -10*displayScale);
    if (e.read) {
      fill(80);
      textFont(font, titleSize*displayScale);
    } else {
      fill(0);
      textFont(boldFont, titleSize*displayScale);
    }
    text(e.senderName, 0, 0);

    // subject
    translate(0, titleSpacing* displayScale);
    if (e.read) {
      fill(80);
      textFont(font, (titleSize-2)*displayScale);
    } else {
      fill(0);
      textFont(boldFont, (titleSize-2)*displayScale);
    }
    text(e.subject, 0, 0);

    // body
    textFont(font, (titleSize-2)*displayScale);
    fill(180);
    translate(0, titleSpacing* displayScale);
    String tag = e.body;
    if (tag.length() > 45) tag = e.body.substring(0, 45) + "...";
    text(tag, 0, 0);


    // line
    translate(0, titleSpacing* displayScale);
    stroke(230);
    line(-300*displayScale, 0, 500*displayScale, 0);

    popMatrix();
    translate(0, 155*displayScale);
  }
  popMatrix();
}

class Text extends Message {

  Text(String name, String txt, long t) {
    super("", txt, name, "", t);
  }
}
