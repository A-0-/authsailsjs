var passport = require('passport');

module.exports = {
 
  index: function (req, res) {
    res.view();
  },

  dologin: function(req, res){
    passport.authenticate('local', function(err, user, info) {
      if ((err) || (!user)) {
        return res.send({
        message: 'login failed'
        });
        res.send(err);
      }
      req.logIn(user, function(err) {
        if (err) res.send(err);
        return res.send({
          message: 'login successful'
        });
      });
    })(req, res);
  },
  
  doregister: function(req,res){
       var email = req.body.email;
       var password = req.body.password;
       User.createUser(email,password,function(err){
          if(err){
            return res.send({message:'Error while creating the user.'});
          }
          return res.send({message:'User successfully created.'})
       });
  },

  logout: function (req,res){
    req.logout();
    res.redirect('/');
  },

  checkLogin: function(req,res){
    res.send({message:'You have logged in.'});
  }

};

