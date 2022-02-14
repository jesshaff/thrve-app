require("dotenv").config();
const express = require("express");
const session = require("express-session");
const routes = require("./controllers");

const sequelize = require("./config/connection");

// const exphbs = require("express-handlebars");

const db = require("./models");

const PORT = process.env.PORT || 3000;

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({ secret: "feel better", resave: true, saveUninitialized: true })
);
// app.use(passport.initialize());

// app.use(session(sess));

// Handlebars
// app.engine(
//   "handlebars",
//   exphbs({
//     defaultLayout: "main",
//   })
// );
app.set("view engine", "handlebars");

// Routes
app.use(routes);

const syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
