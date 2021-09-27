const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Display all posts
router.get('/', async (req, res) =>{
    try{
        const posts = await Post.findAll({ include: [{model: User}, {model: Comment}] });
        res.status(200).json(posts)

    }catch(err){
        res.status(500).json(err);
    }
})

// Display single post by id
router.get('/:id', async(req, res) =>{
    try{
        // ensure id exists
        const exists = await Post.findByPk(req.params.id);
        if(!exists){
            res.status(400).json(`Post at id ${req.params.id} does not exist`);
        }
        
        const post = await Post.findByPk(
            req.params.id,
            {include: [{ model: User }, { model: Comment }]}
        );
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
})

// Add new post
router.post('/', withAuth, async(req, res) =>{
    try{
        // Read in new post from body (connected at public/js/newPost.js)
        const postBody = {
            post: req.body.newPost, 
            user_id: req.session.userId
        }
        console.log(postBody);
        const newPost = await Post.create(postBody);

        res.status(200).json(newPost);
        res.redirect('/dashboard');
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;