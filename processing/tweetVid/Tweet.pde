float spacing = 10;
PGraphics mask;
int tSize = 25;
int lineSpacing = 5;

class Tweet {

  String text;
  PGraphics canvas;
  PImage img;
  long time;

  float y;

  Tweet(String text, String imgPath) {
    this.text = text;
    img = loadImage(imgPath);
    time = millis();
    canvas = createGraphics (535, 296);
  }

  void display() {
    textFont(font, tSize);

    pushMatrix();

    // profile
    translate(0, 0);
    image(profilePic, 0, 0);

    translate(profilePic.width + 20, 20);

    // name
    fill(0);
    text("Jenna deBoisblanc", 0, 0);
    fill(50);
    text("@jdeboisblanc " + getTimePassed(), textWidth("Jenna deBoisblanc "), 0);

    // text
    fill(0);
    translate(0, tSize+10);
    //text(text, 0, 0, canvas.width, getTextHeight());
    displayWrapped(text, tSize, canvas.width);

    // image
    int texth = getTextBoxHeight(text, tSize, canvas.width);
    translate(0, texth);
    canvas.beginDraw();
    canvas.clear();
    canvas.image(img, 0, 0);
    canvas.mask(mask);
    canvas.endDraw();
    image(canvas, 0, 0);

    // tweetbar
    translate(0, canvas.height +20);
    image(tweetBar, 0, 0);

    // line
    translate(0, tweetBar.height + 20);
    stroke(200);
    line(-width*2, 0, width*2, 0);
    popMatrix();
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
