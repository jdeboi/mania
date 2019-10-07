// const resultsList = document.querySelector('#results-list');
// const searchInput = document.querySelector('#search-input');
// const searchNavTop = document.querySelector('#search-nav-top');
// const searchNavBottom = document.querySelector('#search-nav-bottom');
const bibleVersionID = '06125adad2d5898a-01';
const abbreviation = 'ASV';

const query = "I am the Lord";
search(query);

function search(searchText, offset = 0) {
  getResults(searchText, offset).then((data) => {
    console.log(data);
  });
}


function getResults(searchText, offset = 0) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === this.DONE) {
        const {data, meta} = JSON.parse(this.responseText);

        // _BAPI.t(meta.fumsId);
        resolve(data);
      }
    });

    xhr.open('GET', `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/search?query=${searchText}&offset=${offset}`);
    xhr.setRequestHeader('api-key', keys.bible);

    xhr.onerror = () => reject(xhr.statusText);

    xhr.send();
  });
}
