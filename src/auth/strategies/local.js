import { Strategy as LocalStrategy } from 'passport-local';
import UsersController from '../../controllers/UsersController.js';
import bcrypt from 'bcrypt';

const local =  new LocalStrategy(
  function(username, password, done) {
    UsersController.findUser(username).then(user => {
      if (!user) { return done(null, false); }

      // Load hash from your password DB.
      bcrypt.compare(password, user.password, function(err, res) {
        // res == true
        if (res === false) { return done(null, false); }
        return done(null, user);
      });
    }).catch(error => done(error));
  }
);

export default local;
