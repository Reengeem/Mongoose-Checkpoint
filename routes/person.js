// Import dependencies
import express from "express";
import {
  saveUser,
  createMany,
  findById,
  findEditSave,
  findOneAndUpdate,
  findOneDocument,
  querySearch,
  removeMany,
  findPerson,
  removeDocumentById,
} from "../controller/person.js";

// Create an instance of the Express Router
const router = express.Router();

// Route to seed a single user
router.post("/seed", saveUser);

// Route to seed multiple users
router.post("/seedMany", createMany);

// Route to find a person by name
router.get("/findOnePerson", findPerson);

// Route to find a single document by specified conditions
router.get("/findOneDocument", findOneDocument);

// Route to find a document by ID
router.get("/findDocByID", findById);

// Route to find, edit, and save a document
router.patch("/findIDEditSave", findEditSave);

// Route to find and update a document by name
router.patch("/findOneAndUpdate", findOneAndUpdate);

// Route to delete a single document by ID
router.delete("/deleteOneDocument", removeDocumentById);

// Route to delete multiple documents by specified conditions
router.delete("/deleteMany", removeMany);

// Route to search the database with a query
router.get("/querySearch", querySearch);

// Export the router for use in other parts of the application
export default router;
