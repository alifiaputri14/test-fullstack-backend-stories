const express = require('express');
const router = express.Router();
const Validator = require('fastest-validator');
const { Status } = require('../models');

const v = new Validator();

// Validator schema for status_name
const statusNameSchema = {
  type: 'string',
  min: 3,
  max: 255,
};

// GET all statuses
router.get('/', async (req, res) => {
  try {
    const statuses = await Status.findAll();
    res.json(statuses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET status by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const status = await Status.findByPk(id);
    if (!status) {
      return res.status(404).json({ error: 'Status not found' });
    }
    res.json(status);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST create a new status
router.post('/', async (req, res) => {
  const { status_name } = req.body;

  // Validation
  const validationResult = v.validate({ status_name }, { status_name: statusNameSchema });

  if (validationResult !== true) {
    return res.status(400).json({ error: 'Validation Error', details: validationResult });
  }

  try {
    const newStatus = await Status.create({ status_name });
    res.status(201).json(newStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
