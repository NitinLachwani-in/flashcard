import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

const app = express();
const PORT = 4000;
//const server = new ApolloServer({ typeDefs, resolvers });

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  const app = express();
  server.applyMiddleware({ app });
  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`Server URL http://localhost:4000${server.graphqlPath}`);
}
//server.applyMiddleware({ app });

startApolloServer(typeDefs, resolvers);

mongoose.connect('mongodb://localhost/flashcards_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
