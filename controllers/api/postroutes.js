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

// Add new post
router.post('/', withAuth, async(req, res) =>{
    try{
        // Read in new post from body (connected at public/js/newPost.js)
        const postBody = {
            title: req.body.title,
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

// Edit post
router.put('/:id', async (req, res)=>{
    try{
        const postBody = {
            title: req.body.title,
            post: req.body.newPost
        }

        const postData = await Post.update(postBody, {
            where: {id: req.params.id},
            individualHooks: true
        });
        res.status(200).json(postData);
        res.redirect('/dashboard');
    }catch(err){
        res.status(500).json(err);
    }
})

router.delete('/:id', async (req, res)=>{
    try{
        await Post.destroy({
            where: {id: req.params.id}
        });
        res.status(200).json('Successfully deleted');
        res.redirect('/dashboard');
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;