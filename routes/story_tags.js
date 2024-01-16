const express = require('express');
const router = express.Router();
const { StoryTag, Story } = require('../models');
const Validator = require('fastest-validator');

const v = new Validator();

// Validator schema for story tag
const storyTagSchema = {
  story_id: { type: 'number', positive: true, integer: true },
  tag_name: { type: 'string', min: 1 },
};

// GET all story tags
router.get('/', async (req, res) => {
  try {
    const storyTags = await StoryTag.findAll({
      include: [
        {
          model: Story,
          as: 'story',
        },
      ],
    });
    res.json(storyTags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET story tag by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const storyTag = await StoryTag.findByPk(id, {
      include: [
        {
          model: Story,
          as: 'story',
        },
      ],
    });
    if (!storyTag) {
      return res.status(404).json({ error: 'Story Tag not found' });
    }
    res.json(storyTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST create a new story tag
router.post('/', async (req, res) => {
  const { story_id, tag_name } = req.body;

  // Validation
  const validationResult = v.validate({ story_id, tag_name }, storyTagSchema);

  if (validationResult !== true) {
    return res.status(400).json({ error: 'Validation Error', details: validationResult });
  }

  try {
    const newStoryTag = await StoryTag.create({ story_id, tag_name });
    res.status(201).json(newStoryTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PATCH update a story tag
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { story_id, tag_name } = req.body;

  // Validation
  const validationResult = v.validate({ story_id, tag_name }, storyTagSchema);

  if (validationResult !== true) {
    return res.status(400).json({ error: 'Validation Error', details: validationResult });
  }

  try {
    const storyTag = await StoryTag.findByPk(id);
    if (!storyTag) {
      return res.status(404).json({ error: 'Story Tag not found' });
    }

    storyTag.story_id = story_id || storyTag.story_id;
    storyTag.tag_name = tag_name || storyTag.tag_name;

    await storyTag.save();

    res.json(storyTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE a story tag
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const storyTag = await StoryTag.findByPk(id);
    if (!storyTag) {
      return res.status(404).json({ error: 'Story Tag not found' });
    }

    await storyTag.destroy();

    res.json({ message: 'Story Tag deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
