const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const TypeDefs = require('./schema')
const Resolvers = require('./resolvers')
const { ApolloServer } = require('apollo-server-express')
const dotenv = require('dotenv');
dotenv.config('./config.env');


// DB Connection
const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);
mongoose.set('strictQuery', true); // for suppressing the deprecation warning
mongoose.connect(DB).then(() => {
    console.log("Database successfully connected");
});

//Define Apollo Server
const server = new ApolloServer({
  typeDefs: TypeDefs.typeDefs,
  resolvers: Resolvers.resolvers
})

//Define Express Server
const app = express();
app.use(bodyParser.json());
app.use('*', cors());

async function startServer() {
  await server.start();

  //Add Express app as middleware to Apollo Server
  server.applyMiddleware({ app });

  //Start listen 
  app.listen({ port: process.env.PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
  );
}

startServer()