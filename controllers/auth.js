exports.getLogin = (req, res, next) => {
 console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};



exports.postLogin = (req, res, next) => {
  // res.setHeader('Set-Cookie', 'loggedIn=true'); // ? setting a cookie
  req.session.isLoggedIn = true;                   // ? setting a session
  res.redirect('/');
};
