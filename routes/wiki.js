const express = require('express');
const router = express.Router();
const { db, Page, User } = require('../models')
const addPage = require('../views/addPage');
const wikiPage = require('../views/wikipage');
const main = require('../views/main');


router.use(express.static('../public'))

function generateSlug (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  }


  //get all posts in a list
router.get('/', async (req, res, next) => { //http://localhost:4000/wiki
    try{
        const pages = await Page.findAll();
        // console.log('PAGES', pages)
        res.send(main(pages))
    }
    catch(err){
        next(err)
    }
})

router.post('/', async (req, res, next) => { //http://localhost:4000/wiki
    try {
        // console.log('REQ', req.body)
        let user;
        user = await User.findOne({
            where: {
                name: req.body.name
            }
        })
        // console.log('USER', user);
        if(!user){
            user = await User.create({name: req.body.name, email: req.body.email});
        // console.log('USER in IF', user);
        }

        const pageInput = req.body;
        const slug = generateSlug(pageInput.title);
        // console.log('SLUG', slug)
        const newPage = await Page.create({title: pageInput.title, slug: slug, content: pageInput.content, status: pageInput.status, userId: user.id});
        res.redirect(`/wiki/${newPage.slug}`)
    } catch(err) {
        next(err);
    }
})

router.get('/add', (req, res) => { //http://localhost:4000/wiki/add
    res.send(addPage())
})

//get one post's details route
router.get('/:slug', async (req, res, next) => { //http://localhost:4000/wiki/anyinput
    try{
        const page = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        })

        const user = await User.findOne({
            where: {
                id: page.userId,
            }
        })
        // console.log('PAGE', page)
        res.send(wikiPage(page, user))
    } catch(err){
        next(err);
    }
})


module.exports = router;