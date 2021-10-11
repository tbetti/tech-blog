// Set up routes for homepage and posts dashboard
const router = require('express').Router();

// Connecting to files
const homeRoutes = require('./homeroutes');
const postRoutes = require('./api/postroutes');
const userRoutes = require('./api/userroutes');
const commentRoutes = require('./api/commentroutes');

// Connecting routes to files
router.use('/', homeRoutes);
router.use('/api/posts', postRoutes);
router.use('/api/user', userRoutes);
router.use('/api/comments', commentRoutes);

module.exports = router;