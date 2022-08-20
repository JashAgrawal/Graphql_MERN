const Client = require("../models/client");
const Project = require("../models/project");
const ProjectType = require("./projectSchema");
const ClientType = require("./clientSchema");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
} = require("graphql");
const RootQuery = new GraphQLObjectType({
  name: "Rqt",
  fields: () => ({
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args, context) {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args, context) {
        return Client.findById(args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args, context) {
        return Project.find();
      },
    },
    project: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args, context) {
        return Project.findById(args.id);
      },
    },
  }),
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve(parent, { name, email, phone }, context) {
        const client = new Client({
          name,
          email,
          phone,
        });
        return client.save();
      },
    },
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        clientId: { type: GraphQLString },
      },
      resolve(parent, { name, description, status, clientId }, context) {
        const project = new Project({
          name,
          description,
          status,
          clientId,
        });
        return project.save();
      },
    },
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, { id }, context) {
        const project = Project.findByIdAndDelete(id);
        return project;
      },
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        clientId: { type: GraphQLString },
      },
      resolve(parent, { id, name, description, status, clientId }, context) {
        const project = Project.findByIdAndUpdate(id, {
          name,
          description,
          status,
          clientId,
        });
        return project;
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
