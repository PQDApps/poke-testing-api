import express from 'express';
import bodyParser from 'body-parser';
import PokeGet from './src/get/PokemonGet.js';
import { sequelize } from './src/utils/db.js';
import Users from './src/models/Users.js';

const app = express();
const apiRouter = express.Router();
const port = 3011;

// Parse application/x-www-form-urlencoded and json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes the app is gonna use
app.use('/', express.static('public'))
apiRouter.use('/', PokeGet);
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
