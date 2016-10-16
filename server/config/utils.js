"use strict";
const moment = require('moment');
const path = require('path');
const rootPath = path.normalize(__dirname + '/../../');
const uploads = path.normalize(rootPath + '../uploads/');

exports.dpFormatDate = function(date) {
  return moment(date).format('DD/MM/YYYY');
};

exports.dpDashDates = function(){
	let dates = [];
	dates.push(moment());
	dates.push(moment().subtract(30, 'days'));
	dates.push(moment().subtract(60, 'days'));
	return dates;
};

exports.uploads = path.normalize(rootPath + '../uploads/');
