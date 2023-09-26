// Import express. If type is not set to "module" in package.json it is set with require("express")
import express from "express";

// Instantiate express
const app = express();

// Imports the 'path' module which provides utilities for working with file and directory paths.
import path from "path";

// Enables JSON parsing for incoming requests,
// allowing the application to handle JSON data in the request body.
app.use(express.json());

// This line of code serves static files from the "public" directory, making them accessible to clients.
// Important as security measure. This serves static files securely.
// Only gives access to intented files and prevents unauthorized access to static files in public folder.
app.use(express.static("public"));

// Set port number
const PORT = 8080;

// Set app to listen to port number
app.listen(PORT, () => console.log("Server is running on port:", PORT));

// Import functions from module containing the array used for the API.
import {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
} from "./movies.js";

// CRUD
app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/home.html"));
});

app.get("/movies", (req, res) => {
  res.send(getMovies());
});

app.get("/movies/:name", (req, res) => {
  const movieName = req.params.name;
  const formattedMovieName = movieName.charAt(0).toUpperCase() + movieName.slice(1).toLowerCase();
  res.send(getMovie(formattedMovieName));
});

app.post("/movies", (req, res) => {
  const newMovie = req.body;
  if (!newMovie || !newMovie.name || !newMovie.prodYear) {
    res.send({ error: "Missing mountain data." });
    return;
  }

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

  if (!movieToUpdate || !movieToUpdate.name || !movieToUpdate.prodYear || !movieToUpdate.genre) {
    res.send({ error: "Missing movie data." });
    return;
  }

  const updatedMovie = updateMovie(movieId, movieToUpdate);

  if (updatedMovie.error) {
    res.status(404).send({ error: "No movie with that id." });
  } else {
    res.send(updatedMovie);
  }
});

app.delete("/movies/:name", (req, res) => {
  const movieName = req.params.name;
  const formattedMovieName = movieName.charAt(0).toUpperCase() + movieName.slice(1).toLowerCase();

  const deletedMovie = deleteMovie(formattedMovieName);

  if (deleteMovie.error) {
    res.status(404).send({ error: "No movie with that name." });
  } else {
    res.send(deletedMovie);
  }

});

/* fetch explained 
function getPokemon() {
  // Step 1: Initiating the Fetch as a get request
  fetch("https://pokeapi.co/api/v2/")

    // Step 2: Fetching Data as a Byte Stream
    .then((response) => {
      // Step 3: Parsing the Byte Stream as JSON
      return response.json();
    })

    // Step 4: Accessing the JSON Data
    .then((data) => {
      if (data.error) {
        // Step 5a: Handling Errors in the JSON Data
        console.log(data.error);
      } else {
        // Step 5b: Returning the Data (if no error)
        return data;
      }
    })

    // Step 6: Handling Errors in the Fetch and Parsing Process
    .catch((error) => {
      console.log("Error occurred: ", error);
    });

  // Step 7: Returning a Promise (either with data or undefined)
  // Note: This function doesn't return the data directly; it returns a Promise.
  // The data will be available through the resolved Promise in the calling code.
}


 */
