exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) { //로그인 되어있는지 확인 true or false로 반환
      next();
    } else {
      res.status(403).send('로그인 필요');
    }
  };
  
  exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) { //로그인 되어있는지 확인 true or false로 반환
      next();
    } else {
      const message = encodeURIComponent('로그인한 상태입니다.'); //encodeURIComponent: 모든 문자를 인코딩하는 함수입니다.
      res.redirect(`/?error=${message}`);
    }
  };