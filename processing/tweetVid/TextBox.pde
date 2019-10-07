StringList wordWrap(String s, int maxWidth) {
  // Make an empty ArrayList
  StringList a = new StringList();
  float w = 0;    // Accumulate width of chars
  int i = 0;      // Count through chars
  int rememberSpace = 0; // Remember where the last space was
  // As long as we are not at the end of the String
  while (i < s.length()) {
    // Current char
    char c = s.charAt(i);
    w += textWidth(c); // accumulate width
    if (c == ' ') rememberSpace = i; // Are we a blank space?
    if (w > maxWidth) {  // Have we reached the end of a line?
      String sub = s.substring(0, rememberSpace); // Make a substring
      // Chop off space at beginning
      if (sub.length() > 0 && sub.charAt(0) == ' ') sub = sub.substring(1, sub.length());
      // Add substring to the list
      a.append(sub);
      // Reset everything
      s = s.substring(rememberSpace, s.length());
      i = 0;
      w = 0;
    } else {
      i++;  // Keep going!
    }
  }

  // Take care of the last remaining line
  if (s.length() > 0 && s.charAt(0) == ' ') s = s.substring(1, s.length());
  a.append(s);

  return a;
}



//
// display each line of text one by one
//
void displayWrapped(String str, int fontSize, int w) {
  float texty = 0;
  StringList myTexts = wordWrap(str, w);
  // loop through lines
  for (int i=0; i < myTexts.size(); i++) {
    String s = myTexts.get(i);
    text(s, 0, texty);
    if (i != myTexts.size()-1) texty += fontSize+lineSpacing;
  }
}

int getTextBoxHeight(String str, int fontSize, int w) {

  StringList myTexts = wordWrap(str, w);
  return (fontSize + lineSpacing) * myTexts.size();
}
