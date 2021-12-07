import Users from '../models/Users.js';

/**
 * Updates the users profile
 * Excludes password, google id, and facebook id
 */
const updateUser = (req) => {
  let user = req.body;
  const userId = req.user.id;

  const fieldsToExclude = [
    'password', 
    'google_id',
    'facebook_id'
  ];
  const updateFields = Object.keys(Users.rawAttributes).filter( s => !fieldsToExclude.includes(s))

  return Users.update(user, {
    where: { id: userId },
    returning: true,
    fields: updateFields
  }).then(updatedUser => { 
    return updatedUser; 
  }).catch(error => { throw error; });
}

/*
const updateUserImg = (req) => {
  const userId = req.user.id;
  const imageName = req.file.filename;

  return Users.update({image: imageName}, {
    where: { id: userId },
    returning: true,
    fields: ['image']
  });
}
*/

/**
 * Helper functions for auth
 */
const findUser = (username) => {
  return new Promise((resolve, reject) => {
    Users.findOne({where: { username: username }}).then(user => {
      resolve(user);
    }).catch(error => {
      reject(error);
    })
  });
}

const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    Users.findOne({where: { id: id }}).then(user => {
      resolve(user);
    }).catch(error => {
      reject(error);
    })
  });
}

const createUser = (user) => {
  return Users.create(user).then(user => {
    return user;
  }).catch(error => { throw error; });
}

const findOrCreate = (user) => {
  return Users.findOrCreate(user).then(user => {
    return user;
  }).catch(error => { 
    throw error; 
  });
}

export default { updateUser, findUser, findUserById, createUser, findOrCreate }
