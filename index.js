import express from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import PokeGet from './src/get/PokemonGet.js';
import { sequelize } from './src/utils/db.js';
import Users from './src/models/Users.js';
import UsersController from './src/controllers/UsersController.js';
import passport from 'passport';
import AuthRouter from './src/auth/Authentication.js';
import LocalStrategy from './src/auth/strategies/local.js';

const app = express();
const apiRouter = express.Router();
const port = 3011;

// Parse application/x-www-form-urlencoded and json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressSession(({ secret: 'ghastly haunter gengar', resave: false, saveUninitialized: false })));

// Allow CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Start passport middleware and use auth strategies
app.use(passport.initialize());
app.use(passport.session());
passport.use(LocalStrategy);

// Configure Passport authenticated session persistence.
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  UsersController.findUserById(id).then(user => {
    cb(null, user);
  }).catch(error => cb(error));
});

// Check if the user is logged in
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.status(401).send('Please log in and try again');
}

// Make sure requests are authenticated
app.all('*', (req, res, next) => {
  if (req.path.includes('/api/auth'))
    next();
  else if (req.path.includes('/api'))
    ensureAuthenticated(req, res, next);
  else 
    next();
});

// Routes the app is gonna use
app.use('/', express.static('public'))
apiRouter.use('/', PokeGet);
apiRouter.use('/', AuthRouter);
app.use('/api', apiRouter);

// Handle 404's
app.use(function (req, res, next) {
  res.status(404).send("404 - Sorry can't find that!")
})

sequelize.authenticate().then(() => {
  console.log('Connected to Postgres');

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });
  Users.sync();
}).catch(error => {
  console.log('Could not connect to Postgres: ' + error)
});
