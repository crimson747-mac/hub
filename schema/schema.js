const {fileLoader, mergeResolvers, mergeTypes} = require("merge-graphql-schemas");
const { makeExecutableSchema } = require("graphql-tools");
const path = require("path");

const allTypes = fileLoader(path.join(__dirname, "/*.graphql"))
const allResolvers = fileLoader(path.join(__dirname, "/resolvers.js"));

const schema = makeExecutableSchema({
    typeDefs: mergeTypes(allTypes),
    resolvers: mergeResolvers(allResolvers),
})

module.exports = schema;