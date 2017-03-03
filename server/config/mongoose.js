const mongoose = require('mongoose');
const DeviationModel = require('../models/Deviation');
const userModel = require('../models/User');
const taskModel = require('../models/Task');
const filesModel = require('../models/File');
const loggerModel = require('../models/Logger');

/*eslint no-console: 0*/
module.exports = function(config) {
  mongoose.Promise = global.Promise;
	mongoose.connect(config.db);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('Deviation db opened');
  });

};
