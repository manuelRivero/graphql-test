const express = require("express");
const bodyParser = require("body-parser");
const graphqlHTTP = require("express-graphql");

const mongoose = require("mongoose");

const schemas = require("./graphql/schemas/index");
const resolvers = require("./graphql/resolvers/index");

// middleware
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(authMiddleware);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schemas,
    rootValue: resolvers,
    graphiql: true,
  })
);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-lotux.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 8000);
  })
  .catch((err) => console.log(err));
