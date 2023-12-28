// Import dependencies
import mongoose from "mongoose";

// Define the Person schema
const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    favoriteFoods: {
      type: [String], // This indicates an array of strings
      default: [], // Default value is an empty array
    },
  },
  { timestamps: true }
);

// Create the Person model
const Person = mongoose.model("Person", personSchema);

// Export the Person model to use it in other files
export default Person;
