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


// CRUD
app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/home.html"));
});

app.get("/", (req, res) => {
    
});

app.get("/", (req, res) => {
    
});

app.post("/", (req, res) => {
    
});

app.patch("/", (req, res) => {
    
})

app.delete("/", (req, res) => {
    
})


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