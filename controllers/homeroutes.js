const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, User } = require('../models');

// GET route to login page
router.get('/', (req, res) => {
    try {
        res.render('login');
    } catch {
        res.json('error');
    }
})

// GET route to dashboard that requires log-in 
router.get('/dashboard', withAuth, async (req, res) => {
    // If we try to go to the dashbard w/o logging in, we will be redirected to login page
    try {
        const rawPosts = await Post.findAll({
            include: [{ model: User }],
            order: [['updatedAt', 'DESC']],
            limit: 25
        })
        const posts = rawPosts.map((post) => post.get({ plain: true }));

        // Send posts to dashboard.handlebars
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.json(err);
    }
})

// GET route to create post page
router.get('/create-post', withAuth, (req, res) => {
    try {
        res.render('create-post',
        {
            loggedIn: req.session.loggedIn,
            user: {username: req.session.username}}
        );
    } catch (err) {
        res.json(err);
    }
})

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        // find post by id
        const rawPost = await Post.findByPk(req.params.id,
            {
                include: [{ model: User }]
            });
        const post = rawPost.dataValues;
        
        console.log(post);
        res.render('view_post', {
            post,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.json(err);
    }
})

module.exports = router;