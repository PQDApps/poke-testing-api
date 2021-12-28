
import passport from 'passport';
import express from 'express';
import bcrypt from 'bcrypt';
import UsersController from '../controllers/UsersController.js';
const Authentication = express.Router();

const saltRounds = 11;
function saltAndHashPassword(password) {
  return new Promise ((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) { reject(err) };
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) { reject(err) };
        resolve(hash);
      });
    });
  });
}

Authentication.post('/auth/login',
  passport.authenticate('local', {}),
  (req, res) => {
    res.status(200).send('Logged in');
  });

Authentication.post('/auth/register', (req, res, next) => {
  const { username, password, displayname, email } = req.body;
  const image = 'default.png';

  saltAndHashPassword(password).then((hashed) => {
    UsersController.createUser({ username, password: hashed, displayname, email, image })
      .then(user => res.status(201).send({ message: `User created: ${user.username}`}))
      .catch(error => {
        if (error.name === 'SequelizeUniqueConstraintError') {
          return res.status(400).send({ message: 'Username already taken. Username must be unique'});
        }

        next(error);
      });
  });
});

export default Authentication;
