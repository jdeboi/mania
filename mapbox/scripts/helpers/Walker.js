
// long, lat
class Walker {
  constructor(start) {
    this.start = start;
    this.steps = [start];
    this.stepSize = 1000;
    this.directionAngle = Math.random()*360;
    this.coordinates = [start];

    let d = new Date();
    // year, month, day, hours, minutes, seconds, milliseconds)
    this.startTime = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
  }

  takeStep() {
    this.stepSize = Math.random()*500 + 300;
    this.setDirectionAngle();
    let metersX = this.stepSize*Math.cos(deg2rad(this.directionAngle));
    let metersY = this.stepSize*Math.sin(deg2rad(this.directionAngle));
    // let currentStep = this.coordinates[this.coordinates.length-1];
    let currentStep = this.steps[this.steps.length-1];
    let newCoord = getNewCoord(currentStep, metersX, metersY);
    this.steps.push(newCoord);

  }

  addRoute(route) {
    this.coordinates = this.coordinates.concat(route);

    // this.steps = this.eraseLoop(this.steps);
    this.coordinates = eraseLoop(this.coordinates);
  }

  eraseStepsLoop() {
    this.steps = eraseLoop(this.steps);
  }

  setDirectionAngle() {
    // let r = Math.random();
    // if (r < 0.33) this.directionAngle += 90;
    // else if (r < 0.66) this.directionAngle -= 90;

    let r = Math.random();
    this.directionAngle
    if (r > 0.5) this.directionAngle += Math.random() * 180 - 90;

    // let r = Math.random();
    // if (r < 0.65) {
    //   return;
    // }
    // else {
    //   let possibleDirections = [-90, 90];
    //   let nextAngle = possibleDirections[Math.floor(Math.random()*2)];
    //   this.directionAngle += nextAngle;
    // }
  }

  getLastCoordinate() {
    return this.coordinates[this.coordinates.length-1];
  }

  getLatestStepString() {
    let currentStep = this.coordinates[this.coordinates.length-1];
    let newCoord = this.steps[this.steps.length-1];
    return this.getCoordinateString([currentStep, newCoord]);
  }

  getStepsString() {
    return this.getCoordinateString(this.steps);
  }

  getCoordinateString(coords) {
    let coordString = "";
    for (let i = 0; i < coords.length - 1; i++) {
      coordString += coords[i][0] + "," +  coords[i][1] + ";"
    }
    let e = coords.length - 1;
    coordString += coords[e][0] + "," +  coords[e][1]
    return coordString;
  }

  getCoordinatesJson() {
    console.log(JSON.stringify(this.coordinates));
  }

  saveCoordinatesJson() {
    let json = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "geometry": {
            "type": "LineString",
            "coordinates": this.coordinates
          }
        }
      ]
    }
  saveJSON(json, "../json/steps2.json");          
  }

  getStepsArray() {
    return this.steps;
  }

  getCoordinatesArray() {
    return this.coordinates;
  }

  setDirections() {
    let that = this;
    let mode = 'walking';
    let coords = this.getStepsString();
    let url = 'https://api.mapbox.com/directions/v5/mapbox/' + mode + '/' + coords + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;
    // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    let req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', url, true);
    req.onload = function() {
      let data = req.response.routes[0];
      let route = data.geometry.coordinates;
      // this.coordinates = this.coordinates.concat(route);
      that.addRoute(route);
      updateLine("route", that.getCoordinatesArray());
      updateLine("steps", that.getStepsArray());
      addNumberedPoints(that.getStepsArray());
      // saveImages(walker.getStepsArray());
    };
    req.send();
  }





}
