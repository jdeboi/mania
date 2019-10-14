
byte rnaToByte(String rna) {
  // 256 biggest in base 10
  byte dig = 0;
  for (int i = 0; i < 4; i++) {
    byte b = 0;
    switch(rna.charAt(i)) {
    case 'a': 
      b = 0;
      break;
    case 'g':
      b = 1;
      break;
    case 'c':
      b = 2;
      break;
    case 't':
      b = 3;
      break;
    case 'u':
      b = 3;
      break;
    }
    b <<= (3-i)*2;
    dig += b;
  }
  return dig;
}


String backToRNA(byte[] bytes) {
  String nucleotides = "";
  for (byte b : bytes) {
    int val = b & 0xFF;
    for (int i = 3; i >= 0; i--) {
      // go from farthest left bit in groups of 2, so & with 00000011
      int bitc = (b >> (i * 2)) & 0x03;
      if (bitc == ADENINE) {
        nucleotides += "a";
      } else if (bitc == GUANINE) {
        nucleotides += "g";
      } else if (bitc == CYTOSINE) {
        nucleotides += "c";
      } else if (bitc == URACIL || bitc == THYMINE) {
        if (IS_RNA) nucleotides += "u";
        else nucleotides += "t" ;
      }
    }
  }
  return nucleotides;
}

String getRNAString(String [] code) {
  String codeString = "";
  for (String line : code) {
    String[] units = line.split(" ");
    for (int i = 1; i < units.length; i++) {
      codeString += units[i];
    }
  }
  return codeString;
}

// now turn that string of agatc... into an array of bytes; 
// 1 byte = 4 nucelotides
// 2 bits / nucleotide
byte [] getRNABytes(String s) {
  byte [] bytes = new byte[s.length()/4];
  for (int i = 0; i < bytes.length; i++) {
    bytes[i] = rnaToByte(s.substring(i*4, i*4+4));
  }
  return bytes;
}

void testing() {

  String[] influenzaCode = loadStrings("influenza.txt");
  // rnaToByte 
  //String rna = "aggg";
  //println(binary(rnaToByte(rna)));

  //can I get an array of these bytes?
  //String teststr = "atggagag"; 
  //int i = 0;
  //for (byte b : getRNABytes(teststr)) {
  //  println(i + " " + binary(b));
  //  i++;
  //}

  // does backToRNA work?
  //byte[] testb = {byte(unbinary("11111111"))};
  //println(backToRNA(testb));

  //test everything
  String influenzaString = getRNAString(influenzaCode);
  byte[] influenzaBytes = getRNABytes(influenzaString);
  if (influenzaString.equals(backToRNA(influenzaBytes))) {
    println("YAS");
  } else {
    println("nope");
    println(influenzaString);
    println("-------");
    println(backToRNA(influenzaBytes));
  }
}
