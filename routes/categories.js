const express = require("express");
const router = express.Router();
const Validator = require("fastest-validator");
const v = new Validator();
const { Category } = require("../models");

// GET all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET category by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST create a new category
router.post("/", async (req, res) => {
  const { category_name } = req.body;
  
  // Validation
  const validationResult = v.validate({ category_name }, {
    category_name: { type: "string", min: 3, max: 255 }
  });

  if (validationResult !== true) {
    return res.status(400).json({ error: "Validation Error", details: validationResult });
  }

  try {
    const newCategory = await Category.create({ category_name });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
