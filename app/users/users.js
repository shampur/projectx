/**
 * Created by cshampur on 1/16/17.
 */

var userModel = require('./usersmodel');
var logger = require('../../config/logger');

module.exports = {
    getAllUsers: function(req,res){
        userModel.find({}, function(err, users){
            res.send(users);
        })
    },

    createUser: function(req, res){
        var user = req.body;
        var newUser = new userModel({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            city: user.city
        });

        newUser.save(function (err){
            if(err)
                logger.info('Error saving user', {username: user.username});
        })

    },

    deleteUser: function(req, res){
        userModel.remove({username: req.param['userid']}, function(err, removed){
            if(removed > 0)
                logger.info('')
        })
    },

    updateUser: function(req,res){

    },

    getSingleUser: function(req,res){
        userModel.find({username: req.param['userid']}, function(err, users){
            if(err)

            res.send(users);
        })
    }
}