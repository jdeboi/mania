let TWEETING = false;
let icons = [];

mapboxgl.accessToken = "pk.eyJ1IjoiamRlYm9pIiwiYSI6ImNpeGRycXVreTAwZ20yemw2cmxta2N1anAifQ.O1DaomQGJpctzx05Vq422w";
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/jdeboi/cj1l2j86t00022rmoh3d8t700',
  zoom: 12
});

let canvas;

function setup() {
  canvas = createCanvas(400, 400);
}

function draw() {
  // background(0);
}

function checkIcons(coord) {
  if (icons.length > 0) {
    addIcon(icons[0], coord);
    icons.splice(0);
  }
}

function addIcon(icon, coord) {

}
map.on('click', function() {
  let r = Math.floor(Math.random()*3);
  let possibleIcons = ["text", "email", "tweet"];
  let icon = possibleIcons[r];
  icons.push(icon)
})
map.on('load', function () {
  // We use D3 to fetch the JSON here so that we can parse and use it separately
  // from GL JS's use in the added source. You can use any request method (library
  // or otherwise) that you want.
  d3.json('../json/steps.json', function(err, coords) {
    // d3.json('https://docs.mapbox.com/mapbox-gl-js/assets/hike.geojson', function(err, data) {

    if (err) throw err;

    // save full coordinate list for later
    // start by showing just the first coordinate
    // var coordinates = data.features[0].geometry.coordinates;
    // data.features[0].geometry.coordinates = [coordinates[0]];

    var coordinates = coords[0].coordinates;
    let data = getGeoJson([coordinates[0]]);

    // add it to the map
    map.addSource('trace', { type: 'geojson', data: data });
    map.addLayer({
      "id": "trace",
      "type": "line",
      "source": "trace",
      "paint": {
        "line-color": "yellow",
        "line-opacity": 0.75,
        "line-width": 5
      }
    });

    // setup the viewport
    map.jumpTo({ 'center': coordinates[0], 'zoom': 14 });
    map.setPitch(30);

    // on a regular basis, add more coordinates from the saved list and update the map
    var i = 0;
    var j = 0;
    let maxStep = 3;
    let dis = distanceInMetersBetweenCoordinates(coordinates[0], coordinates[1]);
    let jsteps = dis / maxStep;
    jstep = 1/jsteps;

    var timer = window.setInterval(function() {
      if (i < coordinates.length-1) {

        let newCoord = lerpCoords(coordinates[i], coordinates[i+1], j);
        data.features[0].geometry.coordinates.push(newCoord);
        checkIcons(newCoord);
        j += jstep;
        map.getSource('trace').setData(data);
        map.panTo(newCoord);

        if (j >= 1) {
          i++;
          if (i < coordinates.length - 1) {
            dis = distanceInMetersBetweenCoordinates(coordinates[i], coordinates[i+1]);
            let jsteps = dis / maxStep;
            jstep = 1/jsteps;
            j = 0;
            sendTweet(i);
          }
          // data.features[0].geometry.coordinates.push(coordinates[i]);
        }
      } else {
        window.clearInterval(timer);
      }
    }, 10);
  });
});

function sendTweet(i) {
  // let num = Math.floor(i / 3);
  // if (i%3 == 0 && num < 11) {
  if (i < 11) {
    search(i, "I am the Lord");
  }
}

const bibleVersionID = '06125adad2d5898a-01';
const abbreviation = 'ASV';

// const query = "sign";
// search(query);

function search(i, searchText, offset = 0) {
  getBibleResults(searchText, offset).then((data) => {
    // console.log(data);
    let index = Math.floor(random(10));
    let verse = data.verses[index].text;
    let ref = data.verses[index].reference;
    if (TWEETING) tweet(i, ref + " " + verse);
  });
}


function getBibleResults(searchText, offset = 0) {
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

function tweet(id, text) {
  let path = "http://localhost:3000/tweet";
  data = {id: id, text: text};
  httpPost(path, "json", data,
  function(result) {
    console.log(result);
  }, function(error) {
    console.log("error");
  })
}

function getGeoJson(coords) {
  let geojson = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "LineString",
          "coordinates": coords
        }
      }
    ]
  }
  return geojson;
}

function addIconLayers() {
  let possibleIcons = ["text", "email", "tweet"];
  for (icon of possibleIcons) {
    map.loadImage('images/icons/' + icon + '.png', function(error, image) {
      if (error) throw error;
      map.addImage(icon, image);
    });
    map.addLayer({
      "id": icon+ "_points" ,
      "type": "symbol",
      "source": {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": [{
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": []
            }
          }]
        }
      },
      "layout": {
        "icon-image": icon,
        "icon-size": 0.25
      }
    });
  }


}

function updateIconLayers(icon, coord) {

}
