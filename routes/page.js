const express = require('express');
const { Post, User, Hashtag, Comment } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followingIdList = req.user ? req.user.Followings.map(f => f.id) : [];
  next();
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', {title: '내 정보 - JisuBird' });
});

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', {title: '회원가입 - JisuBird' });
});

router.get('/', async (req, res, next) => {
    try {
      const posts = await Post.findAll({
        include: {
          model: User,
          attributes: ['id', 'nick'],
        },
        order: [['createdAt', 'DESC']],
      });
      const comments = await Comment.findAll({
        include: [{
          model: User,
          attributes: ['id', 'nick'],
        },
        {
          model: Post,
          attributes: ['id'],
        }],
        order: [['createdAt', 'ASC']],
      });
      res.render('main', {
        title: 'JisuBird',
        twits: posts,
        comments: comments,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
 });

 router.get('/hashtag', async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect('/');
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    let comments = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ 
        include: [{ model: User }],
        order: [['createdAt', 'DESC']]
       });
       comments = await Comment.findAll({
        include: [{
          model: User,
          attributes: ['id', 'nick'],
        },
        {
          model: Post,
          attributes: ['id'],
        }],
        order: [['createdAt', 'ASC']],
      });
    }

    return res.render('main', {
      title: `#${query} 검색 결과 | JisuBird`,
      twits: posts,
      comments: comments,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;