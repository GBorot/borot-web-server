// now we have lots of things to reload, we need to launch the server with this line :
// nodemon src/app.js -e js,hbs

const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars, engine and views location
app.set("view engine", "hbs"); // all you need to get handlebars set up
app.set("views", viewsPath); // custom directory to tell express where to search files
hbs.registerPartials(partialsPath); // Setup partials

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Gautier"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Gautier"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This text is here to help you",
    title: "Help",
    name: "Gautier"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );

  // res.send({
  //   forecast: "It is snowing",
  //   location: "philadelphia",
  //   address: req.query.address
  // });
});

app.get("/products", (req, res) => {
  console.log(req.query.search);
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }

  res.send({
    products: []
  });
});

// here * means : match anything that didn't match before. Handly for 404 page
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Gautier",
    errorMessage: "Help article not found"
  });
  //   res.send("Help article not found");
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Gautier",
    errorMessage: "Page not found"
  });
  //   res.send("My 404 page");
});

app.listen(port, () => {
  console.log("Server is up on port " + port + ".");
});
