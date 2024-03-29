let TWEETING = false;
let icons = [];
let tweetPoints = [];
let textPoints = [];
let emailPoints = [];
let coords = [];

mapboxgl.accessToken = "pk.eyJ1IjoiamRlYm9pIiwiYSI6ImNpeGRycXVreTAwZ20yemw2cmxta2N1anAifQ.O1DaomQGJpctzx05Vq422w";
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/jdeboi/cj1l2j86t00022rmoh3d8t700',
  zoom: 22
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
  if (icon == "tweet") {
    tweetPoints.push(coord);
    updateIconLayer(icon, tweetPoints);
  }
  else if (icon == "email") {
    emailPoints.push(coord);
    updateIconLayer(icon, emailPoints);
  }
  else if (icon == "text") {
    textPoints.push(coord);
    updateIconLayer(icon, textPoints);
  }

}
map.on('click', function() {
  let r = Math.floor(Math.random()*3);
  let possibleIcons = ["text", "tweet", "email"];
  let icon = possibleIcons[r];
  icons.push(icon)
})
map.on('load', function () {
  // We use D3 to fetch the JSON here so that we can parse and use it separately
  // from GL JS's use in the added source. You can use any request method (library
  // or otherwise) that you want.
  addIconLayers();
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
            // sendTweet(i);
          }
          // data.features[0].geometry.coordinates.push(coordinates[i]);
        }
      } else {
        window.clearInterval(timer);
      }
    }, 10);
  });
});


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
  let iconSize = 0.07;
  map.loadImage('images/icons/tweet.png', function(error, image) {
    if (error) throw error;
    map.addImage('tweet', image);
    map.addLayer({
      "id": "tweet_points",
      "type": "symbol",
      "source": {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates":[]
              }
            }]
          }
        },
        "layout": {
          "icon-image": "tweet",
          "icon-size": iconSize
        }
      });
    });
    map.loadImage('images/icons/text.png', function(error, image) {
      if (error) throw error;
      map.addImage('text', image);
      map.addLayer({
        "id": "text_points",
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates":[]
                }
              }]
            }
          },
          "layout": {
            "icon-image": "text",
            "icon-size": iconSize
          }
        });
      });
      map.loadImage('images/icons/email.png', function(error, image) {
        if (error) throw error;
        map.addImage('email', image);
        map.addLayer({
          "id": "email_points",
          "type": "symbol",
          "source": {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": [
                {
                  "type": "Feature",
                  "geometry": {
                    "type": "Point",
                    "coordinates":[]
                  }
                }]
              }
            },
            "layout": {
              "icon-image": "email",
              "icon-size": iconSize
            }
          });
        });

    }

    function updateIconLayer(icon, coords) {
      let features = [];
      for (coord of coords) {
        features.push({
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": coord
          }});
        }
        var geojson = {
          "type": "FeatureCollection",
          "features": features
        };
        map.getSource(icon+"_points").setData(geojson);
      }
