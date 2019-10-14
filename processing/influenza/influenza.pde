boolean IS_RNA = false;

int ADENINE = 0;
int GUANINE = 1;
int CYTOSINE = 2;
int URACIL = 3;
int THYMINE = 3;

int texts = 100;
int spacing = 70;
int numSpaces = 0;
int ySep = 150;

String influenzaString;
char currentNucleotide = 'a';
int nucleoTideIndex;
ArrayList<Integer> currentBits;
long lastChecked;

String confickerBinary = "01101001011011100111010000100000011011010110000101101001011011100010100001101001";

PFont font;

void setup() {
  size(1600, 800);

  font = createFont("DisplayOTF.otf", texts);
  //font = createFont("lcddot_tr.ttf", texts);

  //testing();

  String[] influenzaCode = loadStrings("influenza.txt");
  influenzaString = getRNAString(influenzaCode);

  numSpaces = round((width-2.0*spacing)/spacing);
}

void draw() {
  background(0);
  
  //stroke(255);
  //line(width/2, 0, width/2, height);
  
  //translate(spacing, 0);
  //displayHoriz();
  displayHorizMid();
  update(180);
}


boolean update(int delayT) {
  if (millis() - lastChecked > delayT) {
    lastChecked = millis();
    nucleoTideIndex++;
    return true;
  }
  return false;
}
