var mongoose = require('mongoose');
var DeviationModel = require('../models/Deviation');
var userModel = require('../models/User');
var taskModel = require('../models/Task');
var filesModel = require('../models/File');

module.exports = function(config) {
	mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('Deviation db opened');
  });

};
