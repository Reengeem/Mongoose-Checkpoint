import Person from "../models/personModel.js";
import mongoose from "mongoose";

// Create a new person here
export async function saveUser(req, res) {
  const { name, age, favoriteFoods } = req.body;
  // Create a document instance
  const newPerson = new Person({
    name,
    age,
    favoriteFoods,
  });

  // Save the person to the database
  const savedPerson = await newPerson.save();
  if (savedPerson) {
    console.log(savedPerson);
  }

  res.json({ message: "user saved", savedPerson });

  // Close the connection after saving
  mongoose.connection.close();
}

// Create many persons
export async function createMany(req, res) {
  try {
    const usersData = req.body;

    // Use map to create an array of user objects
    const users = usersData.map(({ name, age, favoriteFoods }) => {
      return {
        name,
        age,
        favoriteFoods,
      };
    });

    // Use mongoose's create method to save all the users concurrently
    const savedUsers = await Person.create(users);

    if (savedUsers.length > 0) {
      console.log(savedUsers);
    }

    res.json({ message: "users saved", savedUsers });

    // Note: No need to close the connection after using create
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving users" });
  }
}

//Find People by Name
export async function findPerson(req, res, err) {
  const { name } = req.body;
  const foundPerson = await Person.find({ name });
  if (err) {
    console.error("Error finding people:", err);
  } else {
    console.log("Found people:", foundPerson);
  }

  res.json({ message: "Person Found:", foundPerson });

  // Close the connection after finding people
  mongoose.connection.close();
}

// Find a Single Matching Document
export async function findOneDocument(req, res, err) {
  const { favoriteFoods } = req.body;
  try {
    const document = await Person.findOne({
      favoriteFoods: favoriteFoods,
    }).exec();

    if (document) {
      console.log("Found person:", document);
    } else {
      console.log("Person not found.");
    }

    // Close the connection after finding a person (consider moving this to a higher level)

    res.json({ message: "Document found", document });
  } catch (err) {
    console.error("Error finding person:", err);

    // Handle the error and send an appropriate response
    res.status(500).json({ message: "Error finding person" });
  }
}

// Search Database by ID
export async function findById(req, res) {
  const { _id, favoriteFoods } = req.body;

  try {
    const document = await Person.findById({
      _id,
    }).exec();

    if (document) {
      console.log("Found person:", document);
    } else {
      console.log("Person not found.");
    }
    res.json({ message: "Document found", document });
  } catch (error) {
    console.error("Error finding person:", error);

    // Handle the error and send an appropriate response
    res.status(500).json({ message: "Error finding person" });
  }

  // Close the connection after finding a person by id
  // mongoose.connection.close();
}

// Update Database by finding, editing and saving
export async function findEditSave(req, res, error) {
  const { _id } = req.body;
  try {
    // Use findById to find the document by its unique identifier
    const document = await Person.findById(_id);

    if (!document) {
      return res.status(404).json({ message: "Person not found" });
    }

    // Modify the document (e.g., add a favorite food)
    document.favoriteFoods.push("Hamburger");

    // Save the updated document
    const updatedPerson = await document.save();

    // Send a response with the updated document
    res.json({ message: "Updated Document", updatedPerson });
  } catch (error) {
    console.error("Error finding or updating person:", error);
    res.status(500).json({ message: "Error finding or updating person" });
  }
}

//
export async function findOneAndUpdate(req, res, err) {
  try {
    const { name } = req.body;
    const personNameToUpdate = name;

    // Use the await keyword to wait for the promise to resolve
    const updatedPerson = await Person.findOneAndUpdate(
      { personNameToUpdate },
      { age: 20 },
      { new: true }
    );

    if (updatedPerson) {
      console.log("Person updated by name:", updatedPerson);
      res.json({ message: "Person updated", updatedPerson });
    } else {
      console.log("Person not found for update.");
      res.status(404).json({ message: "Person not found for update" });
    }

    // Note: No need to close the connection here; manage connections at a higher level
  } catch (error) {
    console.error("Error updating person by name:", error);
    res.status(500).json({ message: "Error updating person by name" });
  }
}

// Delete one document from the database
export async function removeDocumentById(req, res) {
  try {
    const { _id } = req.body;

    // Use the await keyword to wait for the promise to resolve
    const deletedPerson = await Person.findByIdAndDelete(_id);

    if (deletedPerson) {
      console.log("Person deleted by id:", deletedPerson);
      res.json({ message: "Person deleted", deletedPerson });
    } else {
      console.log("Person not found for deletion.");
      res.status(404).json({ message: "Person not found for deletion" });
    }

    // Note: No need to close the connection here; manage connections at a higher level
  } catch (error) {
    console.error("Error deleting person by id:", error);
    res.status(500).json({ message: "Error deleting person by id" });
  }
}

// Delete many documents from the database
export async function removeMany(req, res) {
  try {
    const personNameToDelete = req.body.name;

    // Use the await keyword to wait for the promise to resolve
    const result = await Person.deleteMany({ name: personNameToDelete });

    console.log("People deleted by name:", result);

    // Note: No need to close the connection here; manage connections at a higher level
    res.json({ message: "People deleted", result });
  } catch (error) {
    console.error("Error deleting people by name:", error);
    res.status(500).json({ message: "Error deleting people by name" });
  }
}

// use search query
export async function querySearch(req, res) {
  const { name, age, favoriteFoods } = req.body;
  try {
    // Use the await keyword to wait for the promise to resolve
    const data = await Person.find({ favoriteFoods })
      .sort({ name: 1 }) // Sort in ascending order by name
      .limit(2) // Limit the results to 2 documents
      .select("-age"); // Exclude the 'age' field

    if (data && data.length) {
      res.json({ message: "Found people", data });
      console.log("Found people:", data);
    } else {
      console.log("No people found.");
      res.status(404).json({ message: "No people found." });
    }

    // Note: No need to close the connection here; manage connections at a higher level
  } catch (error) {
    console.error("Error searching people:", error);
    res.status(500).json({ message: "Error searching people" });
  }
}
