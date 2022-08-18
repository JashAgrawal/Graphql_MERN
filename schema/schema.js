const { clients, projects } = require("../database/db");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLScalarType,
  GraphQLList,
} = require("graphql");

const ClientType = new GraphQLObjectType({
  name: "ClientType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "Rqt",
  fields: () => ({
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args, context) {
        return clients;
      },
    },
    client: {
      type: ClientType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args, context) {
        return clients.find((client) => client.id === args.id);
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
