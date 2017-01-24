/**
 * Created by cshampur on 1/16/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    firstname: String,
    lastname: String,
    city: String
})

var userModel = mongoose.model('Users', userSchema);


module.exports = userModel;
