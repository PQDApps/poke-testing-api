import Pokedex from 'pokedex-promise-v2';
const options = {
  protocol: 'https',
  hostName: 'pokeapi.co',
  versionPath: '/api/v2/',
  cacheLimit: 5184000 * 1000, // 60days
  timeout: 30 * 1000 // 30s
}
const P = new Pokedex(options); 
import express, { response } from 'express';
const PokeGet = express.Router();

PokeGet.get('/pokemon/:id', (req, res, next) => {
  P.getPokemonByName(req.params.id).then(response => {
    console.log(response);
    res.pkResponse = response;
    next();
  }).catch(error => {
    console.log(error);
    res.status(500).send(error);
  });
}, replaceUrls);

PokeGet.get('/pokemon-species/:id', (req, res, next) => {
  P.getPokemonSpeciesByName(req.params.id).then(response => {
    res.pkResponse = response;
    next();
  }).catch(error => {
    console.log(error);
    res.status(500).send(error);
  });
}, replaceUrls);

PokeGet.get('/pokemon-form/:id', (req, res, next) => {
  P.getPokemonFormByName(req.params.id).then(response => {
    res.pkResponse = response;
    next();
  }).catch(error => {
    console.log(error);
    res.status(500).send(error);
  });
}, replaceUrls);

PokeGet.get('/ability/:id', (req, res, next) => {
  P.getAbilityByName(req.params.id).then(response => {
    res.pkResponse = response;
    next();
  }).catch(error => {
    console.log(error);
    res.status(500).send(error);
  });
}, replaceUrls);

PokeGet.get('/pokemon/:id/encounters', (req, res, next) => {
  P.getEncounterMethodsList(req.params.id).then(response => {
    res.pkResponse = response;
    next();
  }).catch(error => {
    console.log(error);
    res.status(500).send(error);
  });
}, replaceUrls);

PokeGet.get('/version/:id', (req, res, next) => {
  P.getVersionByName(req.params.id).then(response => {
    res.pkResponse = response;
    next();
  }).catch(error => {
    console.log(error);
    res.status(500).send(error);
  });
}, replaceUrls);

PokeGet.get('/encounter-method/:id', (req, res, next) => {
  P.getEncounterMethodByName(req.params.id).then(response => {
    res.pkResponse = response;
    next();
  }).catch(error => {
    console.log(error);
    res.status(500).send(error);
  });
}, replaceUrls);

PokeGet.get('/move/:id', (req, res, next) => {
  P.getMoveByName(req.params.id).then(response => {
    res.pkResponse = response;
    next();
  }).catch(error => {
    console.log(error);
    res.status(500).send(error);
  });
}, replaceUrls);

PokeGet.get('/stat/:id', (req, res, next) => {
  P.getStatByName(req.params.id).then(response => {
    res.pkResponse = response;
    next();
  }).catch(error => {
    console.log(error);
    res.status(500).send(error);
  });
}, replaceUrls);

PokeGet.get('/type/:id', (req, res, next) => {
  P.getTypeByName(req.params.id).then(response => {
    res.pkResponse = response;
    next();
  }).catch(error => {
    console.log(error);
    res.status(500).send(error);
  });
}, replaceUrls);

function replaceUrls(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.pkResponse = JSON.stringify(res.pkResponse).split('https://pokeapi.co/api/v2').join('http://localhost:3011/api');
  res.status(200).send(res.pkResponse);
}

export default PokeGet;
