import { nanoid } from 'nanoid';

/** @type {Set<string>} */
const tokenStore = new Set();

export function MakeAndStoreToken() {
  const token = nanoid() + `_x${Date.now() + 60 * 60000}`;
  tokenStore.add(token);
  return token;
}

const ignoreRoute = new Set(['/signup', '/signin']);
/**
 * 
 * @param {import('fastify').FastifyRequest} req 
 * @param {import('fastify').FastifyReply} res 
 * @param {Function<void>} done 
 */
export function SecurityHandler(req, res, done) {
  if (ignoreRoute.has(req.url)) {
    return done();
  }
  if (tokenStore.has(req.headers['authorization'])) {
    return done();
  }
  res.code(401).send({ error: req.headers['authorization']?.length > 30 ? 'Invalid Token' : 'Unauthorized' });

}

setInterval(() => {
  const now = Date.now();
  tokenStore.forEach((token) => {
    const expirationTime = parseInt(token.split('_x').pop());
    if (expirationTime < now) {
      tokenStore.delete(token);
    }
  });
}, 10 * 60000);
