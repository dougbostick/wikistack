const express = require('express');
const router = express.Router();
const { db, Page, User } = require('../models')
const views = require('../views/');

router.get('/', async(req, res, next) => {
    try{
        const users = await User.findAll();
        console.log('USERS', users)
        res.send(views.userList(users));
    } catch(err){
        next(err);
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        const user = await User.findByPk(req.params.id);
        const pages = await Page.findAll({
            where: {
                userId: user.id
            }
        })
        res.send(views.userPages(user, pages));
    } catch(err){
        next(err);
    }
})

module.exports = router;
