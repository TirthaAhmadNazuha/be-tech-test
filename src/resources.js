import axios from 'axios';

/**
 * @typedef {import('fastify').FastifyRequest} Request 
 * @typedef {import('fastify').FastifyReply} Reply
 */

/**
 * 
 * @param {Request} req 
 * @param {Reply} res 
 */
export async function getProtectedResources(req, res) {
  const result = (await axios.get('https://api.genshin.dev/consumables/food')).data;
  res.send({ result });
}
