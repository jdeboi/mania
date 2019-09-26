// var config = require('./config');
// // var Twitter = require('twitter');
// var Twit = require('twit');
// var fs = require('fs');
// var path = require('path');
//
// var T = new Twit(config);
//
// function uploadImage(id, text){
//   console.log('Opening an image...');
//   var image_path = path.join(__dirname, getImagePath(id)),
//   b64content = fs.readFileSync(image_path, { encoding: 'base64' });
//
//   console.log('Uploading an image...');
//
//   T.post('media/upload', { media_data: b64content }, function (err, data, response) {
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
//       }
//     );
//   }
// });
// }
//
// function getImagePath(id) {
//   let num = zeroFill(id, 9);
//   return `/public/images/densedepth/${num}.png`;
// }
//
// function zeroFill( number, width ) {
//   width -= number.toString().length;
//   if ( width > 0 )
//   {
//     return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
//   }
//   return number + ""; // always return a string
// }


////////////////
// var client = new Twitter({
//   consumer_key: config.consumer_key,
//   consumer_secret: config.consumer_secret,
//   access_token_key: config.access_token_key,
//   access_token_secret: config.access_token_secret
// });

////////////////
// POST
// client.post('statuses/update', {status: 'testing api'},  function(error, tweet, response) {
//   if(error) throw error;
//   console.log(tweet);  // Tweet body.
//   console.log(response);  // Raw response object.
// });

////////////////
// GET
// client.get('favorites/list', function(error, tweets, response) {
//   if(error) throw error;
//   console.log(tweets);  // The favorites.
//   console.log(response);  // Raw response object.
// });


////////////////
// STREAM
// var stream = client.stream('statuses/filter', {track: 'javascript'});
// stream.on('data', function(event) {
//   console.log(event && event.text);
// });
//
// stream.on('error', function(error) {
//   throw error;
// });

// You can also get the stream in a callback if you prefer.
// client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
//   stream.on('data', function(event) {
//     console.log(event && event.text);
//   });
//
//   stream.on('error', function(error) {
//     throw error;
//   });
// });
