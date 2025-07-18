const express = require("express");
const Menu = require("../models/Menu.js");

const route = express.Router();

route.post("/", async (req, res) => {
  try {
    const data = req.body;

    const menu = new Menu(data);

    const savedMenu = await menu.save();
    res.status(201).json(savedMenu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
route.get("/", async (req, res) => {
  try {
    const data = await Menu.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

route.get("/:tastetype", async (req, res) => {
  try {
    const tasteType = req.params.tastetype;
    if (
      tasteType === "salty" ||
      tasteType === "sweet" ||
      tasteType === "spicy" ||
      tasteType === "sour"
    ) {
      const data = await Menu.find({ taste: tasteType });
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: "invalid taste type" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = route;
