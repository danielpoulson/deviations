var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    fullname: {type:String},
    email: {type:String},
    username: {type:String},
    passwordHash: {type:String},
    dept: {type:String},
    role: {type:String}
});

var User = mongoose.model('User', userSchema);
