const passport = require('passport');
const local = require('./localStrategy')
const kakao = require('./kakaoStrategy')
const User = require('../models/user')

module.exports = () => {
    //사용자 정보 객체를 세션에 아이디로 저장
    passport.serializeUser((user, done) => {
        done(null, user.id); //메모리 저장 용량을 줄이기 위해 id만 저장
    });

    //세션에 저장한 아이디를 통해서 사용자 정보 객체를 불러옴
    passport.deserializeUser((id, done) => {
        User.findOne({
          where: { id },
          include: [{
            model: User,
            attributes: ['id', 'nick'],
            as: 'Followers',
          }, {
            model: User,
            attributes: ['id', 'nick'],
            as: 'Followings',
          }],
        })
          .then(user => done(null, user))
          .catch(err => done(err));
      });
    
      local();
      kakao();
    };