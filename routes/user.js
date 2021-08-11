const express = require('express');

const { isLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const query = req.query.user;
  if (!query) {
    return res.redirect('/');
  }
  try {
    const user = await User.findOne({ where: { nick: query } });
    let nick = [];
    if (user) {
      nick = await user.getPosts({ include: [{ model: User }] });
    }

    return res.render('main', {
      title: `${query} 검색 결과 | JisuBird`,
      twits: nick,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send('success');
    } else {
      res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/* 210811 안서현 언팔로우 구현 */
router.post('/:id/unfollow', isLoggedIn, async(req,res,next) => {
  try{
    const user = await User.findOne({ where: { id: req.params.id } });
    if (user){
      await user.removeFollower([parseInt(req.user.id)]);
      res.send('success');
    }
  } catch (error){
    console.error(error);
    next(error); 
  } 
});

module.exports = router;
