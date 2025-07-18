const db = require("../db.js");
const express = require("express");
const Person = require("../models/Person.js");
const { generateToken, jwtAuthMiddleware } = require("../jwt.js");

const route = express.Router();
// Get all persons

route.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

route.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    const person = new Person(data);

    const savedPerson = await person.save();

    const payload = {
      username: savedPerson.username,
      id: savedPerson._id,
    };
    const token = generateToken(payload);

    console.log(token);

    res.status(201).json({ savedPerson, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

route.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const person = await Person.findOne({ username });
    if (!person || !(await person.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const payload = {
      username: person.username,
      id: person._id,
    };

    const token = generateToken(payload);
    console.log(token);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

route.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const { username, _id } = user;
    const response = await Person.findById(_id);
    if (!response) {
      res.status(404).json({ error: "user not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

route.get("/:worktype", async (req, res) => {
  try {
    const workType = req.params.worktype;
    if (
      workType === "chef" ||
      workType === "waiter" ||
      workType === "manager"
    ) {
      const data = await Person.find({ work: workType });
      res.status(200).json(data);
    } else {
      res.status(400).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
route.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const updatedPerson = await Person.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.status(200).json(updatedPerson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
route.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPerson = await Person.findByIdAndDelete(id);
    if (!deletedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.status(200).json(deletedPerson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
module.exports = route;
