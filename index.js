require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const expressPlayGround = require('graphql-playground-middleware-express').default;
const schema = require("./schema/schema");
const path = require('path');;

const app = express();

const server = new ApolloServer({
    schema,
    context: ({req}) => {
        return req.headers;
    }
});

server.applyMiddleware({app});

app.get('/playground', expressPlayGround({endpoint: "/graphql"}));
app.listen({port: 3000}, () => {
    console.log(`GraphQL Server running @ http://localhost:3000${server.graphqlPath}`)
})