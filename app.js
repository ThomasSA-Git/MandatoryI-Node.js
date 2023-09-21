// Import express. If type is not set to "module" in package.json it is set with require("express")
import express from "express";

// Instantiate express
const app = express();

// Set port number
const PORT = 8080;

// Set app to listen to port number
app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
});

// Enables JSON parsing for incoming requests,
// allowing the application to handle JSON data in the request body.
app.use(express.json)

// This line of code serves static files from the "public" directory, making them accessible to clients.
// Important as security measure. This serves static files securely.
// Only gives access to intented files and prevents unauthorized access to static files.
app.use(express.static("public"));

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