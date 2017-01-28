/**
 * Created by cshampur on 1/16/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    firstname: String,
    lastname: String,
    city: String
})

var userModel = mongoose.model('Users', userSchema);


module.exports = userModel;
