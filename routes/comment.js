const express = require('express');
const router = express.Router();

const { Comment } = require('../models');
const { isLoggedIn } = require('./middlewares');

router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        const comment = await Comment.create({
            content: req.body.comment,
            UserId: req.user.id,
            PostId: req.body.twitId
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;