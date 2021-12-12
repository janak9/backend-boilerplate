import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import GraphQLJSON from 'graphql-type-json';
import users from './user';
import * as commonTypes from '../common/types/index';
import auth from '../../middleware/auth';

const apiRouter = express.Router();

apiRouter.use(auth);

const mainTypeDef = gql`
  scalar JSON
  type Query
  type Mutation
`;

const typeDefs = [
  mainTypeDef,
  ...Object.values(commonTypes),
  users.typeDef,
];

const resolvers = [
  { JSON: GraphQLJSON },
  users.resolvers,
];

const private_apollo_server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return { user: req.user };
   },
});

private_apollo_server.applyMiddleware({
  app: apiRouter
});

export default apiRouter;
