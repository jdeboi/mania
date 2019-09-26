var express = require('express');
var router = express.Router();
var config = require('../config');
var Twit = require('twit');
var fs = require('fs');
var path = require('path');
var T = new Twit(config);
const bodyParser = require('body-parser');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/tweet', function(req, res, next) {
  let text = req.body.text;
  let id = parseInt(req.body.id);
  console.log("id", id, req);
  console.log('Opening an image...');
  var image_path = path.join(__dirname, "../" + getImagePath(id)),
  b64content = fs.readFileSync(image_path, { encoding: 'base64' });
  console.log('Uploading an image...');

  T.post('media/upload', { media_data: b64content },
  function (err, data, response) {
    if (err){
      console.log('ERROR:');
      console.log(err);
      res.status(400).send(err);
    }
    else{
      console.log('Image uploaded!');
      console.log('Now tweeting it...');

      T.post('statuses/update', {
        media_ids: new Array(data.media_id_string),
        status: text
      },
      function(err, data, response) {
        if (err){
          console.log('ERROR:');
          console.log(err);
          res.status(400).send(err);
        }
        else{
          console.log('Posted an image!');
          res.json('success');
        }
      });
    }
  });
});


// function uploadImage(id, text){
//   console.log('Opening an image...');
//   var image_path = path.join(__dirname, getImagePath(id)),
//   b64content = fs.readFileSync(image_path, { encoding: 'base64' });
//   console.log('Uploading an image...');
//
//   T.post('media/upload', { media_data: b64content },
//   function (err, data, response) {
//     if (err){
//       console.log('ERROR:');
//       console.log(err);
//     }
//     else{
//       console.log('Image uploaded!');
//       console.log('Now tweeting it...');
//
//       T.post('statuses/update', {
//         media_ids: new Array(data.media_id_string),
//         status: text
//       },
//       function(err, data, response) {
//         if (err){
//           console.log('ERROR:');
//           console.log(err);
//         }
//         else{
//           console.log('Posted an image!');
//         }
//       });
//     }
//   });
// }

function getImagePath(id) {
  let num = zeroFill(id, 9);
  return `/public/images/densedepth/${num}.png`;
}

function zeroFill( number, width ) {
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}

module.exports = router;
