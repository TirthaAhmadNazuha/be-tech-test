import db, { client } from './src/db.js';

(async () => {
  // for show all user in database collection users
  const usersCollection = db.collection('users');
  console.log(await usersCollection.find().toArray());
  client.close();
})();
