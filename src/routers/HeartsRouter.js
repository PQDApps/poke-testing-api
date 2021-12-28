import express, { response } from 'express';
const HeartsRouter = express.Router();
import HeartsController from '../controllers/HeartsController.js';

/**
 * POST /api/pokemon/:id/heart
 */
 HeartsRouter.post('/hearts/:id', (req, res, next) => {
  HeartsController.heartPokemon(req).then(heart => {
    res.status(201).send(heart[0]);
  }).catch(error => next(error));
});

/**
 * GET /api/pokemon/hearted
 */
HeartsRouter.get('/hearts', (req, res, next) => {
  HeartsController.getHeartedPokemon(req).then(hearted => {
    res.status(200).send(hearted);
  }).catch(error => next(error));
});

export default HeartsRouter;
