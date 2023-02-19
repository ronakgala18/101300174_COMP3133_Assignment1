const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const TypeDefs = require('./schema')
const Resolvers = require('./resolver')
const { ApolloServer } = require('apollo-server-express')
const dotenv = require('dotenv');
dotenv.config('./config.env'); 

//mongoDB Atlas Connection String
const db_url = process.env.DATABASE

mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
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
 const PORT = 3000;
  //Start listen 
  app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
}

startServer()