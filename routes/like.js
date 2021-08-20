const express = require('express');
const router = express.Router();

const { User } = require('../models');
const { isLoggedIn } = require('./middlewares');

router.post('/:id/like', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where:{
            id: req.user.id }});
            await user.addLikedPost([parseInt(req.params.postId, 10)]);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/:id/unlike', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where:{
            id: req.user.id }});
            await user.RemoveLikedPost([parseInt(req.params.postId, 10)]);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;