var fs = require('fs');
var csvParser = require('csv-parse');
var mongoose = require('mongoose');
var db = mongoose.connection;

var College = require('../models/College');

