import fastify from 'fastify';
import cors from '@fastify/cors';
import { MakeAndStoreToken, SecurityHandler } from './auth.js';
import UserHandlerRoute from './userHandlerRoute.js';
import { getProtectedResources } from './resources.js';

const app = fastify();
app.register(cors);

app.addHook('preHandler', SecurityHandler);

app.get('/', (req, res) => {
  res.send({ token: MakeAndStoreToken() });
});

const userHandlerRoute = new UserHandlerRoute();

app.post('/signup', userHandlerRoute.registerHandler);
app.post('/signin', userHandlerRoute.loginHandler);
app.get('/resources', getProtectedResources);

app.listen({ host: 'localhost', port: 5178 }, (err, address) => {
  if (err) throw err;
  console.log(`Server listening at ${address}`);
});
