import { MongoClient } from 'mongodb';

export const client = new MongoClient('mongodb://localhost:27017');
const db = client.db('be_tech_test');

export default db;
