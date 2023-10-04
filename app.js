// Import express. If type is not set to "module" in package.json it is set with require ("express")
import express from "express";

// Instantiate express
const app = express();

// Imports the 'path' module which provides utilities for working with file and directory paths. Not needed anymore.
//import path from "path";

// Enables JSON parsing for incoming requests,
// allowing the application to handle JSON data in the request body.
app.use(express.json());

// This line of code serves static files from the "public" directory, making them accessible to clients.
// Important as security measure. This serves static files securely.
// Only gives access to intented files and prevents unauthorized access to static files in public folder.
app.use(express.static("public"));

// Set port number
//const PORT = 8080;

const PORT = Number(process.env.PORT) || 8080;

// Set app to listen to port number
app.listen(PORT, () => console.log("Server is running on port:", PORT));


// Import rendered pages.
import {
  homePage,
  dataTypesPage,
  functionsPage,
  loopsPage,
  nodePage,
  restApiPage,
  fetchPage,
  gitPage,
  xssPage,
  htmlCssPage,
  ssrPage,
  adminPage,
  adminDummyPage
} from "./util/prepPage.js";


// Endpoints for routing

app.get("/", (req, res) => {
  res.send(homePage);
});

app.get("/datatypes", (req, res) => {
  res.send(dataTypesPage);
});

app.get("/functions", (req, res) => {
  res.send(functionsPage);
});

app.get("/loops", (req, res) => {
  res.send(loopsPage);
});

app.get("/node", (req, res) => {
  res.send(nodePage);
});

app.get("/restAPI", (req, res) => {
  res.send(restApiPage);
});

app.get("/fetch", (req, res) => {
  res.send(fetchPage);
});

app.get("/git", (req, res) => {
  res.send(gitPage);
});

app.get("/xss", (req, res) => {
  res.send(xssPage);
});

app.get("/htmlcss", (req, res) => {
  res.send(htmlCssPage);
});

app.get("/ssr", (req, res) => {
  res.send(ssrPage);
});

app.get("/admin", (req, res) => {
  res.send(adminPage);
});

app.get("/adminDummy", (req, res) => {
  res.send(adminDummyPage);
});

// Import functions from module containing the array used for the API CRUD.
import {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
} from "./movies/movies.js";

// Used to santize outputs in the API CRUD
import { sanitizedInput } from "./util/sanitize.js";

// CRUD
app.get("/movies", (req, res) => {
  res.send(getMovies());
});

app.get("/movies/:name", (req, res) => {
  const movieName = sanitizedInput(req.params.name);
  const formattedMovieName =
    movieName.charAt(0).toUpperCase() + movieName.slice(1).toLowerCase();
  res.send(getMovie(formattedMovieName));
});

app.post("/movies", (req, res) => {
  const newMovie = req.body;
  if (!newMovie || !newMovie.name || !newMovie.prodYear) {
    res.send({ error: "Missing mountain data." });
    return;
  }
  // Change first character to upper and the rest to lower in name and genre
  newMovie.name =
    newMovie.name.charAt(0).toUpperCase() +
    newMovie.name.slice(1).toLowerCase();
  newMovie.genre =
    newMovie.genre.charAt(0).toUpperCase() +
    newMovie.genre.slice(1).toLowerCase();

  // Sanitize input
  sanitizedInput(newMovie.name);
  sanitizedInput(newMovie.genre);
  const addedMovie = addMovie(newMovie);

  if (addedMovie.error) {
    res.status(404).send({ error: "No movie with that name." });
  } else {
    res.send(addedMovie);
  }
});

app.patch("/movies/:id", (req, res) => {
  const movieId = Number(req.params.id);
  const movieToUpdate = req.body;

  if (
    !movieToUpdate ||
    !movieToUpdate.name ||
    !movieToUpdate.prodYear ||
    !movieToUpdate.genre
  ) {
    res.send({ error: "Missing movie data." });
    return;
  }

  // Change first character to upper and the rest to lower in name and genre
  movieToUpdate.name =
    movieToUpdate.name.charAt(0).toUpperCase() +
    movieToUpdate.name.slice(1).toLowerCase();

  movieToUpdate.genre =
    movieToUpdate.genre.charAt(0).toUpperCase() +
    movieToUpdate.genre.slice(1).toLowerCase();

  // Sanitize input
  sanitizedInput(movieToUpdate.name);
  sanitizedInput(movieToUpdate.genre);
  const updatedMovie = updateMovie(movieId, movieToUpdate);

  if (updatedMovie.error) {
    res.status(404).send({ error: "No movie with that id." });
  } else {
    res.send(updatedMovie);
  }
});

app.delete("/movies/:name", (req, res) => {
  const movieName = sanitizedInput(req.params.name);
  const formattedMovieName =
    movieName.charAt(0).toUpperCase() + movieName.slice(1).toLowerCase();

  const deletedMovie = deleteMovie(formattedMovieName);

  if (deleteMovie.error) {
    res.status(404).send({ error: "No movie with that name." });
  } else {
    res.send(deletedMovie);
  }
});

// Login for dummy admin page

const userName = "user";
const password = "password";

app.post("/login", (req, res) => {
  const loginData = req.body;

  if (loginData.userName === userName && loginData.password === password) {
    res.send({ redirect: "/adminDummy" });
  }

  // Still needs to handle if login isn't successful.
});
