'use strict';

var config = require('./config/environment');
var parseXmlString = require('xml2js').parseString;
//https://github.com/Vizzuality/cartodb-nodejs
var CartoDB = require('cartodb');
var cartodbClient = new CartoDB({user: config.cartodb.USER, api_key: config.cartodb.API_KEY});

module.exports = function (app) {

  // APIs

  /**
   * @see curl -v -F upload=@/Users/chrismarx/Downloads/eveningrun.gpx http://localhost:3000/gpxroute
   *
   * TODO time to move this function to its own function class export
   */
  app.route('/gpxroute')
    .post(function(req, res) {
      console.log(req.body);
      console.log(req.files);

      //TODO validation and santization of user input
      var name = (req.body.username) ? req.body.username : 'test' + new Date().getTime();

      //Note, the curl request had req.files.upload, while angular uploaded req.files.file
      parseXmlString(req.files.file.buffer.toString(), function (err, result) {
          //console.dir(result.gpx);
          var trkpts = result.gpx.trk[0].trkseg[0].trkpt;
          var lineString = "LINESTRING(";

          for (var i=0, len=trkpts.length; i < len; i++) {
            lineString += trkpts[i]["$"].lon + " " + trkpts[i]["$"].lat + ",";
          }

          //strim the last ","
          lineString = lineString.slice(0, - 1);

          console.log(lineString);

          //To perform the same call without the api, use
          // curl -v --data "q=INSERT INTO gpxline (the_geom, name) VALUES (ST_GeomFromText('LINESTRING(0 0, 0 1)',4326), 'test12345')&api_key={insert key}" https://columbia-wnyc.cartodb.com/api/v2/sql
          cartodbClient.on('connect', function() {
              console.log("connected");

              //TODO seems like this library should really be supporting promises here...
              cartodbClient.query("INSERT INTO gpxline (cartodb_id, the_geom, name) VALUES (DEFAULT, ST_GeomFromText('{lineString}',4326),'{name}') returning cartodb_id", 
                {
                  lineString:lineString + ")",
                  name:name
                },
                function(err, data){
                  if(err){
                    //TODO
                  }

                  console.log(data);

                  //get the id of the record we just inserted, and then complete the rest of the processing
                  var cartodbId = data.rows[0].cartodb_id;

                  cartodbClient.query("INSERT INTO gpxline_part (gpxline_id,the_geom,line_part_index) select * from(select id,ST_MakeLine(geom,lead(geom)OVER(ORDER BY index ASC))as line,index from(SELECT id,(dp).path[1]As index,(dp).geom as geom FROM(SELECT g.cartodb_id as id,ST_DumpPoints(ST_Simplify(g.the_geom,.00005))AS dp from gpxline g where g.cartodb_id = {cartodbId})linePoints)a)b where line is not null", 
                    {
                      cartodbId:cartodbId
                    },
                    function(err, data){
                      if(err){
                        //TODO
                      }

                      //and now... update the ukpred values based on wync data
                      cartodbClient.query("update gpxline_part gp set ukpred = (SELECT avg(w.ukpred)FROM wnyc w where ST_DWithin(w.the_geom,gp.the_geom,.0005))where gp.gpxline_id = {cartodbId}",{
                        cartodbId:cartodbId
                      },
                      function(err,data){
                          if(err){
                            //TODO
                          }

                          //data is ready to return as geoson, but that request can be made directly to carto, so just return the id we need
                          console.log("success");
                          res.json({"cartodbId":cartodbId});
                      });
                  });
              });
          });

          cartodbClient.connect();
      });

      //response is sent from cartodbclient callback
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
