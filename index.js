const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphQL/typeDefs');
const resolvers = require('./graphQL/resolvers');
const { MONGODB } = require('./config');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('MongoDB Connected');
    return server.listen({ port: process.env.PORT || 5000 });
  })
  .then(({ url }) => {
    // eslint-disable-next-line no-console
    console.log(`Server running at ${url}`);
  });
