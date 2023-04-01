const User = require('../models/user');

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
  User.findById('6425fa2a8106168b66720a92')
    .then(user => {
      req.session.isLoggedIn = true;                   // ? setting a session
      req.session.user = user;
      res.redirect('/');
    })
    .catch(err => console.log(err));

};


exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
}