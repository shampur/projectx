/**
 * Created by cshampur on 1/16/17.
 */

var userModel = require('./usersmodel');
var logger = require('../../config/logger');

module.exports = {
    getAllUsers: function(req, res, next){

        userModel.find({}).then(function(users){
            logger.info('Users retrieved successfully');
            res.send(users).status(200);
        }, function(err){
            logger.error('Getting users failed');
            return next(new Error("Getting users failed").status=500);
        });
        /*
        userModel.find({}, function(err, users){
            if(err){
                logger.error('Getting users failed');
                return next(new Error("Getting users failed").status=500);
            }
            else {
                logger.info('Users retrieved successfully');
                res.send(users).status(200);
            }
        });
        */
    },

    createUser: function(req, res){
        var user = req.body;
        var newUser = new userModel({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            city: user.city
        });

        newUser.save().then(function(){
            logger.info('User successfully added', {username: user.username});
            res.json(user).status(201);
        }, function (err) {
            logger.error('Error saving user', {username: user.username});
            return next(new Error("Error saving user").status=500);
        });
        /*
        newUser.save(function (err){
            if(err){
                logger.error('Error saving user', {username: user.username});
                return next(new Error("Error saving user").status=500);
            }
            else{
                logger.warn('Error saving user', {username: user.username});
                res.json(user).status(201);
            }
        });
        */
    },

    deleteUser: function(req, res){
        var userid = req.param['userid'];
        userModel.remove({username: userid}).then(function(removed){
            if(removed > 0){
                logger.info('User Deleted', {username: req.param['userid']});
                res.send(userid).status(200);
            }
            else{
                logger.warn('Mongoose unable to delete user', {username: userid});
                return next(new Error("Error deleting user").status=500);
            }
        }, function(err){
            logger.error('Error with delete user endpoint');
            return next(new Error("Error with delete user endpoint").status=500);
        });
        /*
        userModel.remove({username: userid}, function(err, removed){
            if(err){
                logger.error('Error with delete user endpoint');
                return next(new Error("Error with delete user endpoint").status=500);
            }
            if(removed > 0){
                logger.info('User Deleted', {username: req.param['userid']});
                res.send(userid).status(200);
            }
            else{
                logger.warn('User Delete Failed', {username: userid});
                return next(new Error("Error deleting user").status=500);
            }
        });
        */
    },

    updateUser: function(req,res){

    },

    getSingleUser: function(req,res){
        var userid = req.param['userid'];

        userModel.find({username: userid}).then(function(user){
            logger.info('Single user get successfull', {username: userid});
            res.send(user).status(200);
        }, function(err){
            logger.error('Error with get single user endpoint');
            return next(new Error('Error with get single user endpoint').status = 500);
        });
        /*
        userModel.find({username: userid}, function(err, user){
            if(err){
                logger.error('Error with get single user endpoint');
                return next(new Error('Error with get single user endpoint').status = 500);
            }
            else{
                logger.info('Single user get successfull', {username: userid});
                res.send(user).status(200);
            }
        });
        */
    }
}