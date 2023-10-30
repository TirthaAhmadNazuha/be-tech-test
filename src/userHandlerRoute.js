import { MakeAndStoreToken } from './auth.js';
import db from './db.js';
import { compare, hash } from 'bcrypt';

/**
 * @typedef {import('fastify').FastifyRequest} Request 
 * @typedef {import('fastify').FastifyReply} Reply
 */
class UserHandlerRoute {
  constructor() {
    this.registerHandler = this.registerHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }

  /**
   * 
   * @param {string} username
   * @param {string} phone
   * @returns {boolean}
   */
  registerValidator(username, phone) {
    if (/^[a-zA-Z0-9_]{3,20}$/.test(username) || username.includes(' ') || username == undefined) {
      return { ok: false, message: 'Username is character, number and symbols only underscore(_) and 3-20 length' };
    }
    if (phone == 'islogn') return { ok: true };
    if (phone.length > 15 || !/^\d+$/.test(phone) || username == undefined) {
      return { ok: false, message: 'phone number maximum 15 digits' };
    }
    return { ok: true };
  }

  /**
   * @param {Request} req 
   * @param {Reply} res 
   */
  async registerHandler(req, res) {
    try {
      let { name, username, phone, password } = req.body;
      username = username.trim();
      name = name.trim();
      const validateResult = this.registerValidator(username, phone);
      if (!validateResult.ok) {
        res.code(400).send({ error: 'Input validation error', message: validateResult.message });
      }

      const collection = db.collection('users');
      await collection.createIndex({ username: 1 }, { unique: true });
      const { insertedId } = await collection.insertOne({ name, username, phone, password: await hash(password, 10) });

      res.send({ message: 'Register Success', userId: insertedId, authToken: MakeAndStoreToken() });
    } catch (error) {
      console.error(error);
      if (error.code === 11000) return res.code(400).send({
        error: 'Input validation error',
        message: 'This username is unavailable'
      });
      res.code(500).send({ error: `Internal server error: ${error}` });
    }
  }

  /**
   * @param {Request} req 
   * @param {Reply} res 
   */
  async loginHandler(req, res) {
    try {
      const { username, password } = req.body;
      const collection = db.collection('users');
      const findedUser = await collection.findOne({ username });
      if (findedUser == null) return res.code(400).send({
        error: 'Login failed',
        message: 'Username not found!. Please Register'
      });

      if (await compare(password, findedUser.password)) {
        return res.send({
          user: {
            userId: findedUser._id,
            name: findedUser.name,
            username: findedUser.username,
            phone: findedUser.phone
          },
          authToken: MakeAndStoreToken()
        });
      }
      res.code(400).send({
        error: 'Login failed',
        message: 'Incorrect password!'
      });
    } catch (error) {
      res.code(500).send({ error: `Internal server error: ${error}` });
    }
  }
}

export default UserHandlerRoute;
