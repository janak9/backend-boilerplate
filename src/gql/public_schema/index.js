import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import GraphQLJSON from 'graphql-type-json';
import auth from './auth';
import * as commonTypes from '../common/types/index';

const apiRouter = express.Router();

const mainTypeDef = gql`
  scalar JSON
  type Query
  type Mutation
`;

const typeDefs = [
  mainTypeDef,
  ...Object.values(commonTypes),
  auth.typeDef
];

const resolvers = [
  { JSON: GraphQLJSON },
  auth.resolvers,
];

const public_apollo_server = new ApolloServer({
  typeDefs,
  resolvers,
});

public_apollo_server.applyMiddleware({
  app: apiRouter
});

export default apiRouter;
