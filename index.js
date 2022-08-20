require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./database/config");
const app = express();
const port = process.env.PORT || 8080;
connectDB();
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "DEV",
  })
);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
