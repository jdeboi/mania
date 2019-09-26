let home = [-90.105797,29.9307079];
let lib = [-90.121732, 29.940128];
let test = [-90.15, 29.940128];

mapboxgl.accessToken = keys.mapbox;
let myMap = new mapboxgl.Map({
  container: 'map',
  style: keys.mapboxStyle,
  center: home, // starting position
  zoom: 12
});

let boundFactor = 0.1;
let bounds = [[home[0] - boundFactor, home[1] - boundFactor], [home[0] + boundFactor, home[1] + boundFactor]];
myMap.setMaxBounds(bounds);

let canvas = myMap.getCanvasContainer();

function addLine(id, color) {
  myMap.addLayer({
    "id": id,
    "type": "line",
    "source": {
      "type": "geojson",
      "data": {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "LineString",
          "coordinates": []
        }
      }
    },
    "layout": {
      "line-join": "round",
      "line-cap": "round"
    },
    "paint": {
      "line-color": color,
      "line-width": 8
    }
  });
}

function updateLine(id, coords) {
  var geojson = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: coords
    }
  };
  myMap.getSource(id).setData(geojson);
}


function addNumberedPoints(coords) {
  let features = [];
  for (let i = 0; i < coords.length; i++) {
    let newFeature = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": coords[i]
      },
      "properties": {
        "title": i,
        "icon": "monument"
      }
    }
    features.push(newFeature);
  }
  myMap.addLayer({
    "id": "points",
    "type": "symbol",
    "source": {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": features
      }
    },
    "layout": {
      "icon-image": "{icon}-15",
      "text-field": "{title}",
      "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      "text-offset": [0, 0.6],
      "text-anchor": "top"
    }
  });
}
