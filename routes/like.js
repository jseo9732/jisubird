const express = require('express');
const router = express.Router();

const { Post } = require('../models');
const { isLoggedIn } = require('./middlewares');

router.post('/:id/like', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({ where:{id: req.params.id }});
        await post.addLiker([parseInt(req.user.id, 10)]);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/:id/unlike', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({ where:{id: req.params.id }});
        await post.removeLiker([parseInt(req.user.id, 10)]);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router; 