'use strict';

exports.requiresLogin = function(req,res,next) {
    console.log(req.isAuthenticated());
    if(!req.isAuthenticated()) {
        return res.status(401).send('User is not authorized');
    }
    next();
};