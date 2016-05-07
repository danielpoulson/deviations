var fs = require('fs');

var babelrc = fs.readFileSync('./.babelrc');
var config;

try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

//The require hook will bind itself to node's require and automatically compile files on the fly.
require('babel-core/register')(config);
require('../server');
