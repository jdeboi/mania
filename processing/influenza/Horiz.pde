void displayHoriz() {
  if (!update(100)) {
    displayBitScrollHoriz(255);
    displayNucScrollHoriz(255);
  } else {
    displayBitScrollHoriz(255);
    displayNucScrollHoriz(255);
  }

  displayRectHoriz();
}



void displayRectHoriz() {
  //line(numSpaces/2 * spacing, 0, numSpaces/2 * spacing, height);
  //line((numSpaces/2 +1) * spacing, 0, (numSpaces/2 +1) * spacing, height);

  stroke(255, 0, 0);
  strokeWeight(4);
  noFill();
  int y = int(1/4.0*height-texts/4);
  int h = int(3/4.0*height + texts/2) - y;
  rect(0, y, spacing, h);
}

void displayBitScrollHoriz(int alpha) {
  pushMatrix();
  translate(0, height/2 + texts/3 - ySep/2);

  for (int i = 0; i <= numSpaces; i++) {
    getSettingsHoriz(i, alpha);
    //text(currentBits.get(i), i*spacing, 0);
    char currentBit = confickerBinary.charAt((i+nucleoTideIndex)%confickerBinary.length());
    text(currentBit, i*spacing, 0);
  }
  popMatrix();
}

void getSettingsHoriz(int i, int alpha) {
  float opac = map(i, 0, numSpaces, 255, 0);
  opac = opac * map(alpha, 0, 255, 0, 1);
  textFont(font, texts);
  if (i == 0) {
    fill(0, 255, 0);
  } else {
    fill(50, 50, 255, opac);
  }
}

void displayNucScrollHoriz(int alpha) {
  pushMatrix();

  translate(0, height/2 + texts/3 + ySep/2);

  for (int i = 0; i < numSpaces; i++) {
    getSettingsHoriz(i, alpha);
    char currentNuc = influenzaString.charAt((i+nucleoTideIndex)%influenzaString.length());
    text(Character.toUpperCase(currentNuc), i*spacing, 0);
  }
  popMatrix();
}



////////////////////////////////////////////////////////////////////////////////
void displayHorizMid() {

  displayBitScrollHorizMid();
  displayNucScrollHorizMid();
  stroke(0, 255, 0, 50);
  //line(numSpaces/2*spacing, 0, numSpaces/2*spacing, height);
  //line((numSpaces/2+1)*spacing, 0, (numSpaces/2+1)*spacing, height);
  displayRectHorizMid();
}

void getSettingsHorizMid(int i) {
  getSettingsHorizMid(i, 255);
}

void getSettingsHorizMid(int i, int alpha) {
  float maxT = texts*.9;
  float minT = texts*.2;
  //float ts = map(i, 0, numSpaces/2, minT, maxT);
  float ts = texts;
  float opac = map(i, 0, numSpaces/2, 50, 255);
  color blue = color(0, 0, 255);
  color green = color(0, 255, 0);
  float per = map(i, 0, numSpaces/2, 0, .6);
  color c = lerpColor(blue, green, per);

  if (i > numSpaces/2) {
    //ts = map(i, numSpaces/2, numSpaces, maxT, minT);
    ts = texts;
    opac = map(i, numSpaces/2, numSpaces, 255, 50);
    per = map(i, numSpaces/2, numSpaces, .6, 0);
    c = lerpColor(blue, green, per);
  }

  // all the rects
  //noFill();
  //stroke(c, opac);
  //strokeWeight(4);
  //rect(i*spacing-4, -spacing, spacing - 4, 100);

  fill(c, opac);

  if (i == numSpaces/2) {
    noFill();
    stroke(0, 255, 0);
    strokeWeight(4);
    //rect(i*spacing-4, -spacing, spacing - 4, 100);
    float y0 = -spacing-spacing/4;
    float y1 = spacing/4;
    //line(i*spacing-4, y0, i*spacing-4, y1);
    //line((i+1)*spacing-4, y0, (i+1)*spacing-4, y1);

    fill(0, 255, 0);
    ts = texts;
    
    
  }
  


  textFont(font, ts);
}

void displayBitScrollHorizMid() {
  pushMatrix();

  translate(0, height/2 + texts/3 - ySep/2);
  for (int i = 0; i < numSpaces; i++) {
    pushMatrix();
    getSettingsHorizMid(i);
    //text(currentBits.get(i), i*spacing, 0);
    char currentBit = confickerBinary.charAt((i+nucleoTideIndex)%confickerBinary.length());
    text(currentBit, i*spacing, 0);
    popMatrix();
  }
  popMatrix();
}

void displayNucScrollHorizMid() {
  pushMatrix();
  translate(0, height/2 + texts/3 + ySep/2);
  for (int i = 0; i < numSpaces; i++) {
    getSettingsHorizMid(i);
    char currentNuc = influenzaString.charAt((i+nucleoTideIndex)%influenzaString.length());
    text(currentNuc, i*spacing, 0);
  }
  popMatrix();
}

void displayRectHorizMid() {
  //line(numSpaces/2 * spacing, 0, numSpaces/2 * spacing, height);
  //line((numSpaces/2 +1) * spacing, 0, (numSpaces/2 +1) * spacing, height);

  stroke(255, 0, 0);
  strokeWeight(4);
  noFill();
  int y = int(1/4.0*height-texts/4);
  int h = int(3/4.0*height + texts/2) - y;
  rect(numSpaces/2*spacing-5, y, spacing, h);
}
