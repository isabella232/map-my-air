'use strict';

var config = require('./config/environment');
var parseXmlString = require('xml2js').parseString;
var CartoDB = require('cartodb');
var cartodbClient = new CartoDB({user: config.cartodb.USER, api_key: config.cartodb.API_KEY});

module.exports = function (app) {

  // APIs

  /**
   * @see curl -v -F upload=@/Users/chrismarx/Downloads/eveningrun.gpx http://localhost:3000/gpxroute
   */
  app.route('/gpxroute')
    .post(function(req, res) {
      console.log(req.body);
      console.log(req.files);

      parseXmlString(req.files.upload.buffer.toString(), function (err, result) {
          //console.dir(result.gpx);
          var trkpts = result.gpx.trk[0].trkseg[0].trkpt;
          var lineString = "LINESTRING(";

          for (var i=0, len=trkpts.length; i < len; i++) {
            lineString += trkpts[i]["$"].lon + " " + trkpts[i]["$"].lat + ",";
          }

          //strim the last ","
          lineString = lineString.slice(0, - 1);

          console.log(lineString);

          cartodbClient.on('connect', function() {
              console.log("connected");

              // template can be used
             /*cartodbClient.query("select * from gpxlines limit 5", {table: 'tracker'}, function(err, data){
                  console.log(data);
              });*/

              cartodbClient.query("INSERT INTO gpxlines (the_geom, name) VALUES (ST_GeomFromText('{lineString}',4326),'test{timeStamp}')", 
                {
                  lineString:lineString + ")",
                  timeStamp:new Date().getTime()
                },
                function(err, data){
                  console.log(data);
              });              

              // chained calls are allowed
              //.query("select * from tracker limit 5 offset 5", function(err, data){});
          });

          cartodbClient.connect();
      });

      res.send('success');
    });

  app.route('/gpxroute/:id')
    .get(function(req, res) {
      res.send('Get a route by id');
    })
    .put(function(req, res) {
      res.send('Update the route for this id');
    });
  
  app.route('/:url(api|app|bower_components|assets)/*')
    .get(function (req, res) {
      res.status(404).end();
    });

  app.route('/*')
    .get(function (req, res) {
      res.sendFile(
        app.get('appPath') + '/index.html',
        { root: config.root }
      );
  });

};
