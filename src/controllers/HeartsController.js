import Hearts from '../models/Hearts.js';

const heartPokemon = (req) => {
  const pokemonId = req.params.id;
  const userId = req.user.id;
  let hearted = true; // Default to true

  // If the hearted param is sent use it
  if (req.query.hearted)
    hearted = (req.query.hearted);

  return new Promise((resolve, reject) => {
    upsertHeartPokemon(pokemonId, userId, hearted)
      .then(newHeart => {
        resolve(newHeart);
      }).catch(error => reject(error));
  })
}

const getHeartedPokemon = (req) => {
  const userId = req.user.id;

  return Hearts.findAll({
    where: {
      user_id: userId,
      hearted: true
    }
  }).then(hearted => {
    return hearted;
  }).catch(error => { throw error; });
}

/**
 * Heart (like) a movie
 * @param {number} pokemonId - ID of the movie mamalona
 * @param {number} userId - ID of user making the request
 * @param {boolean} hearted - true for like, false for unlike
 */
 const upsertHeartPokemon = (pokemonId, userId, liked) => {
  return Hearts.upsert({
    hearted: liked,
    user_id: userId,
    pokemon_id: pokemonId
  }, {
    returning: true 
  }).then(newHeart => {
    return newHeart;
  }).catch(error => { throw error; });
}

export default { heartPokemon, getHeartedPokemon, upsertHeartPokemon }
