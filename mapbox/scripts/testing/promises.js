// promieses.all
// https://www.freecodecamp.org/news/promise-all-in-javascript-with-example-6c8c5aea3e32/

let imgs = [];
let img = 0;
let nextimg = 0;
let photoIndex = 0;

function preload() {}

function setup() {
  createCanvas(500, 500);
  loadGifs("manic", 10);
}

function draw() {
  background(255);
  if (imgs[photoIndex] != null) image(imgs[photoIndex], 0, 0);
  // imgs[0].position(50, 350);
  // if (img != null) image(img, 0, 0);
  // image(img, 0, 0);
}

function incrementImg() {
  photoIndex++;
  if (photoIndex >= imgs.length) {
    photoIndex = 0;
  }
}

function mousePressed() {
  incrementImg();
}

function loadGifs(search_term, lmt) {
  var apikey = keys.tenor;
  var search_url = "https://api.tenor.com/v1/search?tag=" + search_term + "&key=" +
  apikey + "&limit=" + lmt;

// promieses.all
// https://www.freecodecamp.org/news/promise-all-in-javascript-with-example-6c8c5aea3e32/
  makeRequest(search_url)
  .then(function (response) {
    let gifs_links = JSON.parse(response.responseText)["results"];
    let src = gifs_links[0]["media"][0]["tinygif"]["url"];
    // console.log(src);
    // return loadGifPromise(src);
    const promises = []

    gifs_links.map((link) => {
      let src = link["media"][0]["tinygif"]["url"];
      promises.push(loadGifPromise(src))
    })

    console.log(promises) // [ Promise { "pending" }, Promise { "pending" }, Promise { "pending" } ]

    // We are passing an array of pending promises to Promise.all
    // Promise.all will wait till all the promises get resolves and then the same gets resolved.
    return Promise.all(promises)
  })
  // .then(function(img) {
  //   imgs.push(img);
  // })
  .then(function(gifs) {
    console.log("all promises done");
    for (gif of gifs) {
      imgs.push(gif);
    }
  })
  .catch(function (error) {
    console.log('Something went wrong', error);
  });
}



// XHR requests
// https://gomakethings.com/promise-based-xhr/
function makeRequest (url, method) {

  // Create the XHR request
  var request = new XMLHttpRequest();

  // Return it as a Promise
  return new Promise(function (resolve, reject) {

    // Setup our listener to process compeleted requests
    request.onreadystatechange = function () {

      // Only run if the request is complete
      if (request.readyState !== 4) return;

      // Process the response
      if (request.status >= 200 && request.status < 300) {
        // If successful
        resolve(request);
      } else {
        // If failed
        reject({
          status: request.status,
          statusText: request.statusText
        });
      }

    };

    // Setup our HTTP request
    request.open(method || 'GET', url, true);

    // Send the request
    request.send();

  });
};

function loadGifPromise(path) {
  return new Promise(function(resolve, reject) {
    loadImage(path, (img) => resolve(img), (error) => reject(error));
    // createImg(path, "nope", (img) => resolve(img));
  })
}
