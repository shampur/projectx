/**
 * Created by cshampur on 1/16/17.
 */

var userModel = require('./usersmodel');
var logger = require('../../config/logger');
var errorHandler = require('../../config/errorhandler');

module.exports = {
    getAllUsers: function(req, res, next){

        userModel.find({})
            .then(function(users){
                logger.info('Users retrieved successfully');
                res.send(users).status(200);
            })
            .catch(function(err){
                logger.error(err.message);
                return next(errorHandler("Getting users failed", 500));
            });
    },

    createUser: function(req, res, next){
        var user = req.body;
        var newUser = new userModel({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            city: user.city
        });

        newUser.save()
            .then(function(user){
                logger.info('User successfully added', {username: user.username});
                res.json(user).status(201);
            })
            .catch(function(err){
                logger.error(err.message, {username: user.username});
                return next(errorHandler("Error saving user", 500));
            });
    },

    deleteUser: function(req, res, next){
        var userid = req.params['userid'];
        userModel.remove({username: userid})
            .then(function(removed){
                if(removed.result.n > 0){
                    logger.info('User Deleted', {username: req.param['userid']});
                    res.send(userid).status(200);
                }
                else{
                    logger.warn('Mongoose unable to delete user', {username: userid});
                    return next(errorHandler("Error deleting user", 500));
                }
            })
            .catch(function(err){
                logger.error(err.message, {username: userid});
                return next(errorHandler("Error deleting user", 500));
            });
    },

    updateUser: function(req, res, next){
        var userid = req.params['userid'];
        var editedUser = req.body;
        userModel.findOneAndUpdate({username: userid}, editedUser)
                 .then(function(updatedUser){
                     res.json(updatedUser).status(200);
                     logger.info('User successfully updated', {username: userid});
                 })
                .catch(function(err){
                    logger.error(err.message, {username: userid});
                    return next(errorHandler("Error updating user", 500));
                });
    },

    getSingleUser: function(req, res, next){
        var userid = req.params['userid'];
        userModel.find({username: userid})
            .then(function(user){
                logger.info('Single user get successfull', {username: userid});
                res.send(user).status(200);
            })
            .catch(function(err){
                logger.error(err.message, {username: userid});
                return next(errorHandler("Error getting user details", 500));
            });
    }
}