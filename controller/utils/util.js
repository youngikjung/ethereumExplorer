"use strict";

const logger  = require('../logger');

let util = {};

util.parseError = (errors) => {
    let parsed = {};
    if(errors.name == 'ValidationError'){
        for(let name in errors.errors){
            let validationError = errors.errors[name];
            parsed[name] = { message:validationError.message };
        }
    } else if(errors.code == "11000" && errors.errmsg.indexOf("username") > 0) {
        parsed.username = { message:"This username already exists!" };
    } else {
        parsed.unhandled = JSON.stringify(errors);
    }
    return parsed;
}

util.checkStatus = (res) => {
    if (res.ok) { // res.status >= 200 && res.status < 300
        return res;
    } else {
        logger.error('error :' + res.statustext);
    }
}

util.isLogin = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        req.flash("errors", {login: "please login first"});
        res.redirect('logIn');
    }
}

util.noPermission = (req, res) => {
    req.flash('errors', {login: 'you dont have permission'});
    req.logout();
    res.redirect('logIn');
}

module.exports = util;
