
ArrayList<SendEmail>sentEmails;
ArrayList<Email>receivedEmails;
SendEmail currentEmail;
AudioPlayer emailSound;
PImage emailScreen, allEmailScreen, blueArrow;
int bodyWidth = 400;
boolean showMessages = true;
boolean transitionEmail = false;
int transitionIndex = 0;
int numEmails = 0;
long messageTime = 0;

void initEmail() {
  emailScreen = loadImage("images/email/emailSingle.png");
  emailScreen.resize(int(emailScreen.width*displayScale), int(emailScreen.height*displayScale));
  allEmailScreen = loadImage("images/email/emailAll.png");
  allEmailScreen.resize(int(allEmailScreen.width*displayScale), int(allEmailScreen.height*displayScale));
  blueArrow = loadImage("images/parts/blueArrow.png");
  resizeImage(blueArrow);

  currentEmail = new SendEmail("sub", "asdfl ;ka sdf;lkj asd;flkja asdflk", "Everyone I. Know", "everyone@iknow.com");
  emailSound = minim.loadFile("sounds/emailSound.mp3", 2048);

  receivedEmails = new ArrayList<Email>();

  receivedEmails.add(new Email("Are you ok?", "Hey dude. It's been a while. I've seen some weird emails from you, so i'm just checking in. Are you ok? Give me a ring when you get a chance.\n Love you!", 
    "Amanda", "goodfriend@checking.in", -10000));

  receivedEmails.add(new Email("Please call ASAP", "Honey I'm really worried about you. Can you please call me ASAP?", 
    "Bubba", "someone@wholoves.me", -1000));

  receivedEmails.add(new Email("Worried about you", "Jen I'm worried about you. Are you taking your meds? Do you need anything? Please call when you can.", 
    "Mom", "family@keepsyouwhole.com", -3000));

  receivedEmails.add(new Email("?", "I'm not really sure what you were trying to say.", 
    "David", "sorry@acquaintance.com", -30000));

  receivedEmails.add(new Email("?", "I'm not really sure what you were trying to say.", 
    "David", "sorry@acquaintance.com", -30000));

  receivedEmails.add(new Email("?", "I'm not really sure what you were trying to say.", 
    "David", "sorry@acquaintance.com", -30000));

  receivedEmails.add(new Email("?", "I'm not really sure what you were trying to say.", 
    "David", "sorry@acquaintance.com", -30000));
}

void displayEmail() {

  if (showMessages) {
    image(allEmailScreen, 0, 0);
    displayReceivedEmails();
    if (millis() - messageTime > 3000) {
      showMessages = false;
      currentEmail.startEmail();
    }
  } else if (transitionEmail) {
    image(allEmailScreen, 0, 0);

    pushMatrix();
    translate(0, transitionIndex);
    currentEmail.compose();
    popMatrix();

    transitionIndex+=30;
    if (transitionIndex > iphone.height) {
      showMessages = true;
      messageTime = millis();
      transitionIndex = 0;
      transitionEmail = false;
      currentEmail.reset();
    }
  } else {
    image(emailScreen, 0, 0);
    currentEmail.compose();
  }
  displayTime();
  image(iphone, 0, 0);
}

void displayReceivedEmails() {
  pushMatrix();
  translate(115*displayScale, 385*displayScale);
  for (Email e : receivedEmails) {

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

class Email {

  String subject;
  String body;
  String senderName;
  String senderEmail;
  long time;
  long finishedTime;
  boolean read = false;
  String initials;
  color bubbleColor;

  boolean isFinished = false;
  boolean isSending = false;
  boolean blueArrowOn = false;

  Email(String sub, String bd, String senderName, String senderEmail, long t) {
    this.subject = sub;
    this.body = bd;
    this.senderName = senderName;
    this.senderEmail = senderEmail;
    this.time = t;
    this.initials = senderName.charAt(0) + "";
    this.read = int(random(2)) == 0;

    color[] colors = {
      color(#70c0f2), 
      color(#a3a3a3), 
      color(#9d8980), 
      color(#edc151)
    };

    numEmails++;
    bubbleColor = colors[numEmails%colors.length];
  }
}

class SendEmail extends Email {

  int strIndex = 0;
  boolean isComposing = true;

  SendEmail(String sub, String bd, String senderName, String senderEmail) {
    super(sub, bd, senderName, senderEmail, millis());
  }

  void startEmail() { 
    strIndex = 0;

    isComposing = true;
    isFinished = false;
    isSending = false;
    blueArrowOn = false;
  }


  void compose() {

    if (isComposing) {
      displayBlueArrow();
      pushMatrix();
      textSize(tSize*displayScale);
      translate(80*displayScale, 300*displayScale);
      if (strIndex < senderEmail.length()) {
        displayAddress(strIndex, true);
      } else if (strIndex < senderEmail.length() + subject.length()) {
        displayAddress(senderEmail.length(), false);
        displaySubject(strIndex-senderEmail.length(), true);
      } else if (strIndex < senderEmail.length() + subject.length() + body.length()) {
        displayAddress(senderEmail.length(), false);
        displaySubject(subject.length(), false);
        displayBody(strIndex-senderEmail.length()-subject.length(), true);
      } else {
        if (!isFinished) {
          isFinished = true;
          finishedTime = millis();
        } else if (millis() - finishedTime > 1000 && millis() - finishedTime < 1500) {
          if (!emailSound.isPlaying()) {
            emailSound.cue(0);
            emailSound.play();
          }
          blueArrowOn = true;
        } else if (millis() - finishedTime >= 1500) {
          sendEmail();
        }
        displayAddress(senderEmail.length(), false);
        displaySubject(subject.length(), false);
        displayBody(body.length(), false);
        //isComposing = false;
      }

      popMatrix();
    }
  }

  void displayBlueArrow() {
    pushMatrix();
    translate(680*displayScale, 247*displayScale);
    if (blueArrowOn) {
      fill(220);
      noStroke();
      pushMatrix();
      translate(13*displayScale, 12*displayScale);
      float diam = 70;
      ellipse(0, 0, diam*displayScale, diam*displayScale);
      popMatrix();
    }
    image(blueArrow, 0, 0);

    popMatrix();
  }


  void sendEmail() {

    transitionEmail = true;
  }

  void displayAddress(int index, boolean cursor) {
    fill(0);
    stroke(0);

    pushMatrix();
    translate(0, 50*displayScale);
    text(senderEmail.substring(0, index), 0, 0);

    if (cursor) {
      float x = textWidth(senderEmail.substring(0, index));
      int y = 0;
      displayCursor(x, y);
    }
    popMatrix();
  }

  void displaySubject(int index, boolean cursor) {
    fill(0);
    stroke(0);


    pushMatrix();
    translate(0, 200*displayScale);
    text(subject.substring(0, index), 0, 0);

    if (cursor) {
      float x = textWidth(senderEmail.substring(0, index));
      int y = 0;
      displayCursor(x, y);
    }
    popMatrix();
  }

  void displayBody(int index, boolean cursor) {
    fill(0);
    stroke(0);

    pushMatrix();
    translate(0, 300*displayScale);
    displayWrapped(body.substring(0, index), tSize, bodyWidth);

    if (cursor) {
      float x = textWidth(body.substring(0, index));
      float y = 0;
      displayCursor(x, y);
    }
    popMatrix();
  }

  void reset() {
    isComposing = false;
    blueArrowOn = false;
  }
}
