
var bcrypt = require('bcrypt');
 
module.exports = {
 
  attributes: {
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  
  createUser: function(email,password,cb){
    this.encrypt(password,function(err,encryptedPassword){
        User.create({'email':email,'password':encryptedPassword}).exec(function(err,result){
            if(err){
              console.log("Error while creating user "+err);
              cb(err);
              return;
            }
            console.log(result);
            cb(null);
        });  
    });
  },

  encrypt: function(password, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) {
          console.log("Error while encrypting password "+err);
          cb(err);
        }else{
          cb(null, hash);
        }
      });
    });
  }
 
};