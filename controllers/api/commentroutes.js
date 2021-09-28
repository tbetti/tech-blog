const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Display all posts
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.findAll({
            include: [
                { model: User },
                { model: Post }
            ]
        });
        res.status(200).json(comments)

    } catch (err) {
        res.status(500).json(err);
    }
})

// Add new comment
// Add back in withAuth
router.post('/', withAuth, async (req, res) => {
    try {
        // how will we get post_id?
        const commentBody = 
        {
            comment: req.body.newComment,
            user_id: req.session.userId,
            post_id: req.body.dataId
        }
        console.log(commentBody);
        const newComment = await Comment.create(commentBody);

        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;