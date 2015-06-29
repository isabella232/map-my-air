'use strict';

var express = require('express');
var compression = require('compression');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');

//@see http://lollyrock.com/articles/express4-file-upload/
var multer  = require('multer');

var config = require('./environment');

module.exports = function (app) {

  var env = config.env;

  app.set('view engine', 'html');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(compression());
  app.use(morgan('dev'));
  app.use(express.static(path.join(config.root, 'client')));
  app.set('appPath', 'client');

  //@see https://github.com/expressjs/multer
  //add support for mulitpart file uploads
  app.use(multer({ 
    dest: './uploads/',
    limits: {
      fieldNameSize: 100,
      files: 2,
      fields: 5,
      fileSize: 1000000 //1 megabyte
    },
    //having this be true means we get a filestream, and no file is saved to the server, which is ideal, since
    //  we just want to 
    inMemory: true
  }));

  if (env === 'development' || env === 'test') {
    app.use(require('errorhandler')());
  }

};
