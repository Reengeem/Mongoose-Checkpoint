// Import necessary modules and configurations
import express from "express";
import connectDB from "./configs/database.js";
import morgan from "morgan";
import router from "./routes/person.js";
import "dotenv/config";

// Create an Express application
const app = express();

// Define the port for the server to listen on
const port = process.env.PORT || 4000;

// Assign the router to a variable for better readability
const person = router;

// Middleware setup
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(morgan("tiny")); // Use Morgan for request logging

// Define a basic route for the root endpoint
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Use the defined router for paths starting with "/api/v1"
app.use("/api/v1", person);

// Start the application
const startApp = async () => {
  try {
    // Connect to the MongoDB database
    await connectDB();

    // Start the Express server
    app.listen(port, () => {
      console.log(
        `Server started at http://localhost:${port} and Connected to MongoDB `
      );
    });
  } catch (error) {
    console.log(error);
  }
};

// Call the function to start the application
startApp();
