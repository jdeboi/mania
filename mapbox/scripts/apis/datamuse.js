
function getRelatedURL(word) {
  let str = getBase();
  str += "&" + getRelated(word);
  // str += "&" + getStartWithLetter(word.charAt(0));
  return str;
}

function getPartOfSpeechURL(word) {
  let str = getBase();
  str += "sp=" + word;
  str += "&md=p&max=1";
  return str;
}

function getRhymingURL(word) {
  let str = getBase();
  str += "&" + getRhyme(word);
  return str;
}

function getBase() {
  return "https://api.datamuse.com/words?"
}

function getRhyme(word) {
  return "rel_rhy=" + word;
}

function getRelated(word) {
  	return "ml="  + word;
}

// adjectives that are often used to describe
function getAdjRelatedToWord(word) {
  return "rel_jjb=" + word;
}

function getWordsSoundsLike(word) {
  return "sl=" + word;
}

// nouns that are often described by the adjective ---
function getNounRelatedToAdj(word) {
  return "rel_jja=" + adj;
}

function getStartWithLetter(let) {
  return 'sp=' + let + '*';
}

function getEndWithLetter(let) {
  return 'sp=*' + let;
}
