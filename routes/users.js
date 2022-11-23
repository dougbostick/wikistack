const express = require('express');
const router = express.Router();
const { db, Page, User } = require('../models')
const views = require('../views/');

router.get('/', async(req, res, next) => {
    try{
        const users = User.findAll();
        res.send(views.userList(users));
    } catch(err){
        next(err);
    }
})

module.exports = router;
