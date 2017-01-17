/**
 * Created by cshampur on 1/16/17.
 */


const userrouter = require('express').Router();
const users = require('./users');
userrouter.use(function(req, res, next){
   console.log("This is a users router middleware");
   next();
});

userrouter.get('/', users.getAllUsers);

userrouter.post('/', users.createUser);

userrouter.get('/:userid', users.getSingleUser);

userrouter.put('/:userid', users.updateUser);

userrouter.delete('/:userid', users.deleteUser);






